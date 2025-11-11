import useAuth from "../../hooks/useAuth";

const DetailItem = ({ label, value }) => {
    const { isDarkMode,  } = useAuth();
  return (
    <div>
      <h3
        className={`text-sm font-semibold mb-1 ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {label}
      </h3>
      <p
        className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
      >
        {value}
      </p>
    </div>
  );
};

export default DetailItem;
