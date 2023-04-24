import ErrorMessage from "../atoms/ErrorMessage";
import Label from "../atoms/Label";

const TextareaField = ({
  name,
  label,
  errors,
  touched,
  containerClassName = "",
  textareaClassName = "bg-[#f8fafc]",
  ...others
}) => {
  return (
    <section className={containerClassName}>
      <Label to={name} name={label} />
      <textarea
        className={textareaClassName + " placeholder:font-normal mt-2"}
        {...others}
      />
      <ErrorMessage errors={errors[name]} touched={touched[name]} />
    </section>
  );
};

export default TextareaField;
