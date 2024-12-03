import { useEffect, useReducer, useState, useCallback } from "react";

export const useLocal = <T extends object>(
  data: T,
  effect?: (arg: {
    init: boolean;
    setDelayedRender: (arg: boolean) => void;
  }) => Promise<void | (() => void)> | void | (() => void),
  deps?: any[]
): {
  [K in keyof T]: T[K] extends Promise<any> ? null | Awaited<T[K]> : T[K];
} & { render: () => void } => {
  const [, _render] = useState({});

  const initialState = {
    data: data as unknown as T & { render: () => void },
    deps: (deps || []) as any[],
    ready: false,
    _loading: {} as any,
    lastRender: 0,
    lastRenderCount: 0,
    delayedRender: false,
    delayedRenderTimeout: null as any,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoize the render function to prevent re-creation on every render
  const render = useCallback(() => {
    if (state.ready) {
      if (state.delayedRender) {
        if (Date.now() - state.lastRender > 100) {
          dispatch({ type: "UPDATE_LAST_RENDER", payload: Date.now() });
          _render({});
        } else {
          clearTimeout(state.delayedRenderTimeout);
          state.delayedRenderTimeout = setTimeout(state.data.render, 50);
        }
        return;
      }

      if (Date.now() - state.lastRender < 300) {
        dispatch({ type: "INCREMENT_RENDER_COUNT" });
      } else {
        dispatch({ type: "RESET_RENDER_COUNT" });
      }

      if (state.lastRenderCount > 300) {
        console.warn(
          "Render has been called more than 300 times within 300ms, halting."
        );
        return;
      }

      dispatch({ type: "UPDATE_LAST_RENDER", payload: Date.now() });
      _render({});
    }
  }, [
    state.ready,
    state.delayedRender,
    state.lastRender,
    state.lastRenderCount,
  ]);

  useEffect(() => {
    dispatch({ type: "SET_READY", payload: true });

    if (effect)
      effect({
        init: true,
        setDelayedRender(arg) {
          dispatch({ type: "SET_DELAYED_RENDER", payload: arg });
        },
      });
  }, [effect]);

  useEffect(() => {
    if (state.ready && state.deps.length > 0 && deps) {
      for (const [k, dep] of Object.entries(deps) as any) {
        if (state.deps[k] !== dep) {
          state.deps[k] = dep;

          if (effect) {
            setTimeout(() => {
              effect({
                init: false,
                setDelayedRender(arg) {
                  dispatch({ type: "SET_DELAYED_RENDER", payload: arg });
                },
              });
            });
          }
          break;
        }
      }
    }
  }, [deps, effect, state.deps, state.ready]);

  // Attach the render function to the state object
  state.data.render = render;

  return state.data as any;
};

// Reducer to handle state transitions
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_READY":
      return { ...state, ready: action.payload };
    case "SET_LOADING":
      return { ...state, _loading: action.payload };
    case "UPDATE_LAST_RENDER":
      return { ...state, lastRender: action.payload };
    case "INCREMENT_RENDER_COUNT":
      return { ...state, lastRenderCount: state.lastRenderCount + 1 };
    case "RESET_RENDER_COUNT":
      return { ...state, lastRenderCount: 0 };
    case "SET_DELAYED_RENDER":
      return { ...state, delayedRender: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
