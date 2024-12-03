import { Textarea, TextInput } from "flowbite-react";
import Datepicker from "../../ui/Datepicker";

export const TypeInput: React.FC<any> = ({
  name,
  fm,
  placeholder,
  disabled = false,
  required,
  type,
  field,
}) => {
  let value: any = fm.data?.[name] || "";
  switch (type) {
    case "textarea":
      return (
        <>
          <Textarea
            id={name}
            name={name}
            disabled={disabled}
            required={required}
            placeholder={placeholder || ""}
            value={value}
            onChange={(ev) => {
              fm.data[name] = ev.currentTarget.value;
              fm.render();
            }}
          />
        </>
      );
      break;

    case "date":
      return (
        <>
          <Datepicker
            value={{ startDate: value, endDate: value }}
            disabled={disabled}
            displayFormat="DD MMM YYYY"
            mode={"daily"}
            maxDate={field?.max_date instanceof Date ? field.max_date : null}
            minDate={field?.min_date instanceof Date ? field.min_date : null}
            asSingle={true}
            useRange={false}
            onChange={(value) => {
              fm.data[name] = value?.startDate
                ? new Date(value?.startDate)
                : null;
              fm.render();
            }}
          />
        </>
      );
      break;
  }
  return (
    <>
      <TextInput
        id={name}
        name={name}
        disabled={disabled}
        required={required}
        placeholder={placeholder || ""}
        value={value}
        type={type}
        onChange={(ev) => {
          fm.data[name] = ev.currentTarget.value;
          fm.render();
        }}
      />
    </>
  );
};
