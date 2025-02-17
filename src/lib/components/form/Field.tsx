import { useEffect, useRef } from "react";
import { FieldCheckbox } from "./field/TypeCheckbox";
import { TypeDropdown } from "./field/TypeDropdown";
import { TypeInput } from "./field/TypeInput";
import { TypeUpload } from "./field/TypeUpload";
import { TypeRichText } from "./field/TypeRichText";
import { TypeTag } from "./field/TypeTag";
import get from "lodash.get";
import { getNumber } from "@/lib/utils/getNumber";
import { useLocal } from "@/lib/utils/use-local";
import { FieldRadio } from "./field/TypeRadio";
import { cn } from "@/lib/utils";

export const Field: React.FC<{
  fm: any;
  label?: string;
  name: string;
  isBetter?: boolean;
  onLoad?: () => Promise<any> | any;
  type?:
    | "rating"
    | "color"
    | "single-checkbox"
    | "radio"
    | "checkbox"
    | "upload"
    | "multi-upload"
    | "dropdown"
    | "multi-dropdown"
    | "checkbox"
    | "radio"
    | "single-checkbox"
    | "richtext"
    | "tag"
    | "text"
    | "money"
    | "textarea"
    | "time"
    | "date"
    | "password"
    | "email";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  hidden_label?: boolean;
  onChange?: ({ data }: any) => Promise<void> | void;
  className?: string;
  classField?: string;
  style?: string;
  prefix?: string | any | (() => any);
  suffix?: string | any | (() => any);
  allowNew?: boolean;
  unique?: boolean;
}> = ({
  fm,
  label,
  isBetter = false,
  name,
  onLoad,
  type = "text",
  placeholder,
  required,
  disabled,
  hidden_label,
  onChange,
  className,
  classField,
  style,
  prefix,
  suffix,
  allowNew,
  unique = true,
}) => {
  let result = null;
  const field = useLocal({
    focus: false,
  });
  const suffixRef = useRef<HTMLDivElement | null>(null);
  const prefixRef = useRef<HTMLDivElement | null>(null);
  const is_disable = fm.mode === "view" ? true : disabled;
  const error = fm.error?.[name];
  useEffect(() => {
    if (typeof fm.fields?.[name] !== "object") {
      const fields = fm.fields?.[name];
      fm.fields[name] = {
        ...fields,
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
        style,
      };
      fm.render();
    }
  }, []);
  const before = typeof prefix === "function" ? prefix() : prefix;
  const after = typeof suffix === "function" ? suffix() : suffix;
  return (
    <>
      <div
        className={cx(
          "flex",
          style === "inline" ? "flex-row gap-x-1" : "flex-col",
          css`
            .field input:focus {
              outline: 0px !important;
              border: 0px !important;
              outline-offset: 0px !important;
              --tw-ring-color: transparent !important;
            }
            .field textarea:focus {
              outline: 0px !important;
              border: 0px !important;
              outline-offset: 0px !important;
              --tw-ring-color: transparent !important;
            }
            .field input {
              border: 0px !important;
              box-shadow: none;
            }
          `,
          style === "gform" &&
            css`
              .field input {
                padding-left: 0px !important;
                padding-right: 0px !important;
              }
              .field textarea {
                padding-left: 0px !important;
                padding-right: 0px !important;
              }
            `
        )}
      >
        {!hidden_label ? (
          <label
            className={cx(
              "block mb-2 text-md font-medium text-gray-900  text-sm flex flex-row",
              style === "inline" ? "w-[100px]" : ""
            )}
          >
            {label}
            {required ? (
              <span className="flex flex-row px-0.5 text-red-500">*</span>
            ) : (
              <></>
            )}
          </label>
        ) : (
          <></>
        )}
        <div
          className={cn(
            error
              ? "flex flex-row rounded-md flex-grow border-red-500 border items-center"
              : "flex flex-row rounded-md flex-grow  items-center",
            is_disable
              ? "border border-gray-100 bg-gray-100"
              : "border border-gray-300 ",
            "relative field",
            !is_disable
              ? style === "underline" || style === "gform"
                ? "focus-within:border-b focus-within:border-b-primary"
                : "focus-within:border focus-within:border-primary"
              : "",
            style === "underline" || style === "gform"
              ? "rounded-none border-transparent border-b-gray-300"
              : "",
            [
              "rating",
              "color",
              "single-checkbox",
              "radio",
              "checkbox",
            ].includes(type) &&
              css`
                border: 0px !important;
              `,
            ["upload"].includes(type) &&
              css`
                padding: 0px !important;
              `,
            classField
          )}
        >
          {before && (
            <div
              // ref={prefixRef}
              className={cx(
                "px-1 py-1  items-center flex flex-row flex-grow rounded-l-md h-full",
                css`
                  height: 2.13rem;
                `
                // style === "gform"
                //   ? ""
                //   : is_disable
                //   ? "bg-gray-200/50 "
                //   : "bg-gray-200/50 "
              )}
            >
              {before}
            </div>
          )}
          {["upload"].includes(type) ? (
            <>
              <TypeUpload
                fm={fm}
                name={name}
                on_change={onChange}
                mode={"upload"}
                disabled={is_disable}
              />
            </>
          ) : ["multi-upload"].includes(type) ? (
            <>
              <TypeUpload
                fm={fm}
                name={name}
                on_change={onChange}
                mode={"upload"}
                type="multi"
                disabled={is_disable}
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
                allowNew={allowNew}
              />
            </>
          ) : ["multi-dropdown"].includes(type) ? (
            <>
              <TypeDropdown
                fm={fm}
                required={required}
                name={name}
                onLoad={onLoad}
                placeholder={placeholder}
                disabled={is_disable}
                onChange={onChange}
                mode="multi"
                unique={unique}
                isBetter={isBetter}
              />
            </>
          ) : ["checkbox"].includes(type) ? (
            <>
              <FieldCheckbox
                fm={fm}
                name={name}
                onLoad={onLoad}
                placeholder={placeholder}
                disabled={is_disable}
                onChange={onChange}
                className={className}
              />
            </>
          ) : ["radio"].includes(type) ? (
            <>
              <FieldRadio
                fm={fm}
                name={name}
                onLoad={onLoad}
                placeholder={placeholder}
                disabled={is_disable}
                onChange={onChange}
                className={className}
              />
            </>
          ) : ["single-checkbox"].includes(type) ? (
            <>
              <FieldCheckbox
                fm={fm}
                name={name}
                onLoad={onLoad}
                placeholder={placeholder}
                disabled={is_disable}
                className={className}
                onChange={onChange}
                mode="single"
              />
            </>
          ) : ["richtext"].includes(type) ? (
            <>
              <TypeRichText
                fm={fm}
                name={name}
                disabled={is_disable}
                className={className}
                onChange={onChange}
              />
            </>
          ) : ["tag"].includes(type) ? (
            <>
              <TypeTag
                fm={fm}
                name={name}
                disabled={is_disable}
                className={className}
                onChange={onChange}
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
                onChange={onChange}
                onFocus={() => {
                  field.focus = true;
                  field.render();
                }}
                className={cx(
                  before &&
                    css`
                      padding-left: ${getNumber(
                        get(prefixRef, "current.clientWidth")
                      ) + 10}px;
                    `,
                  after &&
                    css`
                      padding-right: ${getNumber(
                        get(suffixRef, "current.clientWidth")
                      ) + 10}px;
                    `,
                  className
                )}
              />
            </>
          )}
          {after && (
            <div
              // ref={suffixRef}
              className={cx(
                "px-1 py-1  items-center flex flex-row flex-grow rounded-r-md h-full",
                css`
                  height: 2.13rem;
                `,
                is_disable ? "bg-gray-200/50 " : "bg-gray-200/50 "
              )}
            >
              {after}
            </div>
          )}
        </div>
        {error ? (
          <div className="text-sm text-red-500 py-1">{error}</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
