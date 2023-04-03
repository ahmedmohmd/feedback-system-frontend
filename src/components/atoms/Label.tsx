const Label = ({ to, name }) => {
  return (
    <label htmlFor={to} className="font-semibold mb-2 text-slate-600 ml-3">
      {name} <span className="text-red-500/90 text-lg">*</span>
    </label>
  );
};

export default Label;
