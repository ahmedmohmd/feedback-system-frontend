import { AiFillEyeInvisible } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import ErrorMessage from "../atoms/ErrorMessage";
import Label from "../atoms/Label";

interface Props {
  name: string;
  label: string;
  errors: any;
  touched: any;
  type: string;
  containerClassName: string;
  inputClassName: string;
  children?: any;
  others: { [key: string]: string };
}

const InputField = ({
  name,
  label,
  errors,
  touched,
  type,
  containerClassName = "",
  inputClassName = "",
  ...others
}) => {
  return (
    <section className={containerClassName}>
      <Label to={name} name={label} />
      <input type={type} className={inputClassName} {...others} />
      <ErrorMessage errors={errors[name]} touched={touched[name]} />
    </section>
  );
};

export default InputField;
