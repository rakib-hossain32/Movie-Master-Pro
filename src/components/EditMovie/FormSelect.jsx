import useAuth from "../../hooks/useAuth";

const FormSelect = ({
  label,
  name,
  required,
  options,
  formData,
  setFormData,
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
      <select
        required={required}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className={`w-full px-4 py-2 rounded-xl border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
