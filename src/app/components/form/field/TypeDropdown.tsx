import { Typeahead } from "./Typeahead";

export const TypeDropdown: React.FC<any> = ({required,fm, name, onLoad, onChange,placeholder, disabled}) => {
  return (
    <>
      <Typeahead
        value={fm.data?.[name]? [fm.data?.[name]] : []}
        disabledSearch={false}
        //   popupClassName={}
        required={required}
        onSelect={({ search, item }) => {
          if (item) {
            fm.data[name] = item.value;
            fm.render();
          }
          if(typeof onChange === "function" && item){
            onChange(item.value)
          }
          return item?.value || search;
        }}
        disabled={disabled}
        allowNew={false}
        autoPopupWidth={true}
        focusOpen={true}
        mode={"single"}
        placeholder={placeholder}
        options={onLoad}
      />
    </>
  );
};
