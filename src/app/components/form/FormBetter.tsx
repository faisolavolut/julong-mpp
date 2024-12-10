"use client";
import { Form } from "./Form";
import { useEffect, useState } from "react";

export const FormBetter: React.FC<any> = ({
  children,
  header,
  onTitle,
  onLoad,
  onSubmit,
  onFooter,
  showResize,
  mode,
  className,
  onInit,
}) => {
  const [fm, setFM] = useState<any>({
    data: null as any,
  });
  useEffect(() => {
    console.log("PERUBAHAN DATA", fm.data);
  }, [fm.data]);
  return (
    <div className="flex flex-col flex-grow">
      {typeof fm === "object" && typeof onTitle === "function" ? (
        <div className="flex flex-row w-full">{onTitle(fm)}</div>
      ) : (
        <></>
      )}
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  relative overflow-y-scroll shadow">
        <Form
          {...{
            children,
            header,
            onTitle,
            onLoad,
            onSubmit,
            onFooter,
            showResize,
            mode,
            className: cx(className, "absolute top-0 left-0 w-full"),
            onInit: (form: any) => {
              setFM(form);

              const originalRender = form.render;

              // Buat versi baru dari `local.render`
              form.render = () => {
                // Panggil fungsi asli
                console.log("CEK");
                originalRender();

                // Tambahkan logika tambahan untuk sinkronisasi
                setFM({
                  ...form,
                  submit: form.submit,
                  render: form.render,
                  data: form.data,
                });
                console.log(fm.data)
              };
              form.render();
              if (typeof onInit === "function") {
                onInit(form);
              }
            },
          }}
        />
      </div>
    </div>
  );
};
