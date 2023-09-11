interface Props {
  to: string;
  title: string;
  required?: boolean;
}

const Label = ({ to, title, required }: Props) => {
  return (
    <label
      htmlFor={to}
      className="font-semibold mb-2 text-slate-600 ml-3 self-start"
    >
      {title[0].toUpperCase() + title.slice(1)}{" "}
      {required === false ? null : (
        <span className="text-red-500/90 text-lg">*</span>
      )}
    </label>
  );
};

export default Label;
