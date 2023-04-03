import Label from "../atoms/Label";

const SelectField = ({ name, label, options, ...others }) => {
  return (
    <section className="flex justify-center items-start  flex-col w-full">
      <Label name={name} to={label} />
      <select {...others} name="roadmap">
        {options.map((option) => {
          return (
            <option
              selected={options.selected ? option.selected : false}
              value={option.value}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default SelectField;
