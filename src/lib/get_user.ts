import get from "lodash.get";

export const get_user = (name?: string) => {
  if (process.browser) {
    if (typeof window !== "object") return null;
    const w = window as unknown as {
      user: any;
    };
    return name ? get(w.user, name) : w?.user;
  } else {
    return null;
  }
};
