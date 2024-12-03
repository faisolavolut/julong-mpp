"use client";
import { Field } from "@/app/components/form/Field";
import { Form } from "@/app/components/form/Form";
import { useLocal } from "@/lib/use-local";

function Page() {
  const local = useLocal({
    data: null as any,
  });
  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-grow flex-col">
        <Form
          children={(fm: any) => {
            return (
              <>
                <div className={cx("flex flex-row flex-wrap")}>
                  <Field />
                </div>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}

export default Page;
