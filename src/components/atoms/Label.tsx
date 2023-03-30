const Label = ({ to, name }) => {
  return (
    <label htmlFor={to} className="font-semibold mb-1">
      {name} <span className="text-red-500/90 text-lg">*</span>
    </label>
  );
};

export default Label;
