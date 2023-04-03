const ErrorMessage = ({ touched, errors }) => {
  return touched && errors ? (
    <div
      className="p-4 mb-4 text-sm text-white rounded-3xl bg-red-500/95 w-full mt-2 font-normal"
      role="alert"
    >
      {errors}
    </div>
  ) : null;
};

export default ErrorMessage;
