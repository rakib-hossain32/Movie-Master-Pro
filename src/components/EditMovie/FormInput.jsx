import useAuth from "../../hooks/useAuth";

const FormInput = ({
  label,
  name,
  type,
  required,
  formData,
  setFormData,
  ...rest
}) => {
  const { isDarkMode } = useAuth();

  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label} {required && "*"}
      </label>
      <input
        type={type}
        required={required}
        name={name}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className={`w-full px-4 py-2 rounded-xl border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
