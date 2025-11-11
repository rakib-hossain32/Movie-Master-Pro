import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
// import { useAuth } from "../context/AuthProvider";

export default function MobileNavLink({ icon: Icon, label, to }) {
  const { isDarkMode, setShowMobileMenu } = useAuth();

  return (
    <NavLink
      to={to}
      onClick={() => setShowMobileMenu(false)}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 rounded-xl w-full ${
          isActive
            ? "bg-blue-600 text-white"
            : isDarkMode
            ? "text-gray-300 hover:bg-gray-700"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </NavLink>
  );
}
