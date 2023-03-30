const ErrorMessage = ({ touched, errors }) => {
  return touched && errors ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-3xl bg-red-50 w-full mt-2 font-normal"
      role="alert"
    >
      {errors}
    </div>
  ) : null;
};

export default ErrorMessage;
