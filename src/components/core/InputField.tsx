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

const InputField = ({ title, to, type, errors, field, ...others }) => {
  return (
    <section className="flex justify-center items-start flex-col w-full md:w-[60%]">
      <Label title={title} to={to} />
      <input
        type={type}
        {...others}
        className="bg-slate-50 text-slate-500 focus:!text-primary duration-300 focus:!border-primary border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-full px-5 h-14 outline-none !ring-0 w-full placeholder:font-normal mt-2"
      />
      <ErrorMessage errors={errors} field={field} />
    </section>
  );
};

export default InputField;
