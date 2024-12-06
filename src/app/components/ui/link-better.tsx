import Link from "next/link";
import { FC } from "react";

export const SidebarLinkBetter: FC<{
  className: string;
  style: any;
  children: any;
  href?: string;
  onClick?: () => void
}> = ({ className, style, children, href, onClick }) => {
  if (href)
    return (
      <Link
        href={href}
        className={className}
        style={style} // Terapkan gaya berdasarkan depth
        onClick={() => {
            if(typeof onClick === "function"){
                onClick()
            }
        }}
      >
        {children}
      </Link>
    );
  return (
    <div
      className={className}
      style={style} // Terapkan gaya berdasarkan depth
    >
      {children}
    </div>
  );
};
