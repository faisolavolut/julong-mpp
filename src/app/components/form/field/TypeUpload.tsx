import { FieldUploadSingle } from "./TypeUploadSingle";

export const TypeUpload: React.FC<any> = ({name, fm, on_change, mode}) => {
  return (
    <>
      <FieldUploadSingle
        field={{
          name
        }}
        fm={fm}
        on_change={on_change}
        mode={mode}
      />
    </>
  );
};
