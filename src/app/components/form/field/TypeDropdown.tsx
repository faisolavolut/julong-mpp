import { Typeahead } from "./Typeahead";

export const TypeDropdown: React.FC<any> = ({
  required,
  fm,
  name,
  onLoad,
  onChange,
  placeholder,
  disabled,
  mode,
}) => {
  return (
    <>
      <Typeahead
        value={Array.isArray(fm.data?.[name]) ? fm.data?.[name] : fm.data?.[name] ? [fm.data?.[name]]: []}
        disabledSearch={false}
        //   popupClassName={}
        required={required}
        onSelect={({ search, item }) => {
          console.log(search, item)
          if (item) {
            if (mode === "multi") {
              if (!Array.isArray(fm.data[name])) {
                fm.data[name] = [];
                fm.render();
              }
              fm.data[name].push(item.value);
              fm.render();
            } else {
              fm.data[name] = item.value;
              fm.render();
            }
          }
          if (typeof onChange === "function" && item) {
            onChange(item);
          }
          console.log(fm.data[name])
          return item?.value || search;
        }}
        disabled={disabled}
        allowNew={false}
        autoPopupWidth={true}
        focusOpen={true}
        mode={mode ? mode : "single"}
        placeholder={placeholder}
        options={onLoad}
      />
    </>
  );
};
