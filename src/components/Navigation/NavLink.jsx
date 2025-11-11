import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
// import { useAuth } from "../context/AuthProvider";

export default function CustomNavLink({ icon: Icon, label, to }) {
  const { isDarkMode } = useAuth();

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-3 py-2 rounded-xl transition ${
          isActive
            ? isDarkMode
              ? "bg-gray-700 text-blue-400"
              : "bg-blue-100 text-blue-600"
            : isDarkMode
            ? "text-gray-300 hover:bg-gray-800"
            : "text-gray-700 hover:bg-gray-50"
        }`
      }
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </NavLink>
  );
}
