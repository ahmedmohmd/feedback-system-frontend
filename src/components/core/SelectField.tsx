import { useId } from "react";
import Label from "../atoms/Label";

const SelectField = ({ name, label, options, ...others }) => {
  return (
    <section className="flex justify-center items-start  flex-col w-full">
      <Label name={name} to={label} />
      <select
        // defaultValue={options.find((option) => option.selected.toString())}
        name="roadmap"
        {...others}
      >
        {options.map((option) => {
          return (
            <option key={Math.random()} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default SelectField;
