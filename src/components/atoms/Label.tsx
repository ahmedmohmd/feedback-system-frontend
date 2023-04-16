const Label = ({ to, name, ...others }) => {
  return (
    <label
      htmlFor={to}
      className="font-semibold mb-2 text-slate-600 ml-3 self-start"
      {...others}
    >
      {name} <span className="text-red-500/90 text-lg">*</span>
    </label>
  );
};

export default Label;
