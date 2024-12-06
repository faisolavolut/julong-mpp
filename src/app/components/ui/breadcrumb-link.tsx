import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import Link from "next/link";

const BreadcrumbBetter: FC<any> = ({ data }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
const BreadcrumbBetterLink: FC<{ data: any[]; className?: string }> = ({
  data,
  className,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className={cx(className)}>
        {data.map((e, idx) => {
          return (
            <BreadcrumbItem>
                {e?.url ? (
                  <BreadcrumbLink asChild>
                    <Link href={e.url}>{e.title}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{e.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export { BreadcrumbBetter, BreadcrumbBetterLink };
