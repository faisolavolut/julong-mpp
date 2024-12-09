import { FieldCheckbox } from "./field/TypeCheckbox";
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
  onChange,
  className,
  style
}) => {
  let result = null;
  const is_disable = fm.mode === "view" ? true : disabled
  return (
    <>
      <div className={cx("flex", style === "inline" ? "flex-row gap-x-1" : "flex-col")}>
        {!hidden_label ? 
        <label className={cx("block mb-2 text-md font-medium text-gray-900 dark:text-white text-sm", style === "inline" ? "w-[100px]" : "" )}>
          {label}
        </label> : <></>}
        <div className={cx("flex flex-row rounded-md flex-grow")}>

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
              required={required}
              name={name}
              onLoad={onLoad}
              placeholder={placeholder}
              disabled={is_disable}
              onChange={onChange}
            />
          </>
        ) :["checkbox"].includes(type) ? (
          <>
            <FieldCheckbox
              fm={fm}
              name={name}
              onLoad={onLoad}
              placeholder={placeholder}
              disabled={is_disable}
              on_change={onChange}
              className={className}
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
