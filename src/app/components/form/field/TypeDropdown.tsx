import { Typeahead } from "./Typeahead";

export const TypeDropdown: React.FC<any> = ({fm, name, onLoad, placeholder, disabled}) => {
  return (
    <>
      <Typeahead
        value={fm.data?.[name]? [fm.data?.[name]] : []}
        disabledSearch={false}
        //   popupClassName={}
        onSelect={({ search, item }) => {
          if (item) {
            fm.data[name] = item;
            fm.render();
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
