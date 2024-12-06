"use client";
import { Form } from "./Form";
import { useState } from "react";

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
  const [fm, setFM] = useState<any>(null);

  return (
    <div className="flex flex-col flex-grow">
      {typeof fm === "object" && typeof onTitle === "function" ? (
        <div className="flex flex-row w-full">{onTitle(fm)}</div>
      ) : (
        <></>
      )}
      <div className="w-full flex flex-row flex-grow bg-white rounded-lg  overflow-hidden shadow">
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
            className,

            onInit: (fm: any) => {
              setFM(fm)
              if (typeof onInit === "function") {
                onInit(fm);
              }
            },
          }}
        />
      </div>
    </div>
  );
};
