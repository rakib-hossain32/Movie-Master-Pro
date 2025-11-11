import useAuth from "../hooks/useAuth";

// Tailwind-safe color mapping
const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    bgDark: "bg-blue-900/50",
    text: "text-blue-500",
    label: "text-blue-300",
  },
  purple: {
    bg: "bg-purple-100",
    bgDark: "bg-purple-900/50",
    text: "text-purple-500",
    label: "text-purple-300",
  },
  yellow: {
    bg: "bg-yellow-100",
    bgDark: "bg-yellow-900/50",
    text: "text-yellow-500",
    label: "text-yellow-300",
  },
  green: {
    bg: "bg-green-100",
    bgDark: "bg-green-900/50",
    text: "text-green-500",
    label: "text-green-300",
  },
};

const StatCard = ({ icon: Icon, value, label, color }) => {
  const { isDarkMode } = useAuth();
  const classes = colorClasses[color] || colorClasses.blue; // fallback

  return (
    <div
      className={`p-6 rounded-xl shadow-xl transition transform hover:scale-[1.02] ${
        isDarkMode ? classes.bgDark : classes.bg
      }`}
    >
      <Icon className={`w-8 h-8 mb-3 ${classes.text}`} />
      <h3
        className={`text-3xl font-extrabold ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </h3>
      <p className={`${classes.label} font-medium`}>{label}</p>
    </div>
  );
};

export default StatCard;
