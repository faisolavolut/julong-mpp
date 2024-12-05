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
  hidden_label,
  onChange
}) => {
  let result = null;
  const is_disable = fm.mode === "view" ? true : disabled
  return (
    <>
      <div className={cx("flex flex-col")}>
        {!hidden_label ? 
        <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
          {label}
        </label> : <></>}
        <div className={cx("flex flex-row rounded-md", disabled ? "bg-gray-100" : "")}>

        {["upload"].includes(type) ? (
          <>
            <TypeUpload
              fm={fm}
              name={name}
              on_change={onChange}
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
              disabled={is_disable}
              on_change={onChange}
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
              disabled={is_disable}
              on_change={onChange}
            />
          </>
        )}
        </div>
      </div>
    </>
  );
};
