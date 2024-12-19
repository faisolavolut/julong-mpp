import { useLocal } from "@/lib/use-local";
import { FC, useEffect } from "react";
import { ButtonBetter } from "../../ui/button";

export const FieldCheckbox: FC<any> = ({
  fm,
  name,
  onLoad,
  onChange,
  placeholder,
  disabled,
  className,
  mode,
}) => {
  const local = useLocal({
    list: [] as any[],
    reload: async () => {
      fm.fields[name] = { ...fm.fields?.[name], ...local };
      fm.render();
      const callback = (res: any[]) => {
        if (Array.isArray(res)) {
          local.list = res;
        } else {
          local.list = [];
        }

        local.render();
      };
      const res = onLoad();
      if (res instanceof Promise) res.then(callback);
      else callback(res);
    },
  });
  useEffect(() => {
    fm.fields[name] = { ...fm.fields?.[name], ...local };
    const callback = (res: any[]) => {
      if (Array.isArray(res)) {
        local.list = res;
      } else {
        local.list = [];
      }
      local.render();
    };
    const res = onLoad();
    if (res instanceof Promise) res.then(callback);
    else callback(res);
  }, []);

  let value =
    mode === "single" && typeof fm.data?.[name] === "string"
      ? [fm.data?.[name]]
      : fm.data?.[name];

  let is_tree = false;
  const applyChanges = (selected: any[]) => {
    selected = selected.filter((e) => e);
    const val = selected.map((e) => e.value);
    if (mode === "single") {
      console.log(val)
      selected = val?.[0];
      
      fm.data[name] = selected;
    } else {
      fm.data[name] = val;
    }
    fm.render();
  };
  return (
    <>
      <div className={cx("flex items-center w-full flex-row")}>
        <div
          className={cx(
            `flex flex-col p-0.5 flex-1`,
            !is_tree && "space-y-1 ",
            className
          )}
        >
          {local.list.map((item, idx) => {
            let isChecked = false;
            try {
              isChecked = value.some((e: any) => e === item.value);
            } catch (ex) {}

            return (
              <div
                key={idx + "_checkbox"}
                onClick={() => {
                  if (!disabled) {
                    let selected = Array.isArray(value)
                      ? value.map((row) => {
                          return local.list.find((e) => e.value === row);
                        })
                      : [];

                    if (isChecked) {
                      selected = selected.filter(
                        (e: any) => e.value !== item.value
                      );
                    } else {
                      if (mode === "single") {
                        selected = [item];
                      } else {
                        selected.push(item);
                      }
                    }
                    applyChanges(selected);
                  }
                }}
                className={cx(
                  "text-sm opt-item flex flex-row space-x-1 cursor-pointer items-center rounded-full p-0.5",
                  isChecked && "active"
                )}
              >
                {isChecked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-sky-500"
                  >
                    <path
                      fill="currentColor"
                      d="m10.6 14.092l-2.496-2.496q-.14-.14-.344-.15q-.204-.01-.364.15t-.16.354q0 .194.16.354l2.639 2.638q.242.243.565.243q.323 0 .565-.243l5.477-5.477q.14-.14.15-.344q.01-.204-.15-.363q-.16-.16-.354-.16q-.194 0-.353.16L10.6 14.092ZM5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463H5.615Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463H5.615Zm0-1h12.77q.23 0 .423-.192q.192-.193.192-.423V5.615q0-.23-.192-.423Q18.615 5 18.385 5H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192Z"
                    />
                  </svg>
                )}
                <div className="">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
