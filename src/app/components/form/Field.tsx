import { TypeDropdown } from "./field/TypeDropdown";
import { TypeInput } from "./field/TypeInput";
import { TypeUpload } from "./field/TypeUpload";

export const Field: React.FC<any> = ({
  fm,
  label,
  name,
  onLoad,
  type,
  placeholder,
  required,
  disabled,
  hidden_label
}) => {
  let result = null;
  return (
    <>
      <div className={cx("flex flex-col")}>
        {!hidden_label ? 
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label> : <></>}
        {["upload"].includes(type) ? (
          <>
            <TypeUpload
              fm={fm}
              name={name}
              on_change={() => {}}
              mode={"upload"}
            />
          </>
        ) : ["dropdown"].includes(type) ? (
          <>
            <TypeDropdown
              fm={fm}
              name={name}
              onLoad={onLoad}
              placeholder={placeholder}
              disabled={disabled}
            />
          </>
        ) : (
          <>
            <TypeInput
              fm={fm}
              name={name}
              placeholder={placeholder}
              required={required}
              type={type}
              disabled={disabled}
            />
          </>
        )}
      </div>
    </>
  );
};
