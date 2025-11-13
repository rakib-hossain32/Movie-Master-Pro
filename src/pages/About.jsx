import React from "react";
import { FaFilm, FaStar, FaFilter } from "react-icons/fa"; // Icons for features
import useAuth from "../hooks/useAuth";


const About = () => {
  const { isDarkMode } = useAuth();

  // Conditional theme classes
  const sectionBg = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900";

  const cardBg = isDarkMode
    ? "bg-gray-800 text-gray-300"
    : "bg-white text-gray-700";
  const headingColor = isDarkMode ? "text-cyan-400" : "text-cyan-600";

  return (
    <section className={`py-16 transition-colors duration-500 ${sectionBg}`}>
      <div className="max-w-6xl px-6 mx-auto text-center">
        {/* Heading */}
        <h2
          className={`text-4xl font-extrabold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          🎬 About <span className={headingColor}>MovieMaster Pro</span>
        </h2>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl mb-10 leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          MovieMaster Pro is your ultimate movie management platform. Discover,
          organize, and enjoy your favorite films with ease. Stay updated with
          latest releases, track top-rated movies, and manage your personal
          collection seamlessly.
        </p>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          <div
            className={`shadow-lg rounded-xl p-6 transform transition duration-500 hover:scale-105 ${cardBg}`}
          >
            <FaFilm className={`mx-auto mb-3 text-4xl ${headingColor}`} />
            <h3 className={`text-xl font-semibold mb-2 ${headingColor}`}>
              Organize Your Collection
            </h3>
            <p>
              Add, edit, and manage your personal movie collection effortlessly.
            </p>
          </div>

          <div
            className={`shadow-lg rounded-xl p-6 transform transition duration-500 hover:scale-105 ${cardBg}`}
          >
            <FaStar className={`mx-auto mb-3 text-4xl ${headingColor}`} />
            <h3 className={`text-xl font-semibold mb-2 ${headingColor}`}>
              Discover Top Movies
            </h3>
            <p>
              Explore top-rated, trending, and recently added movies from our
              database.
            </p>
          </div>

          <div
            className={`shadow-lg rounded-xl p-6 transform transition duration-500 hover:scale-105 ${cardBg}`}
          >
            <FaFilter className={`mx-auto mb-3 text-4xl ${headingColor}`} />
            <h3 className={`text-xl font-semibold mb-2 ${headingColor}`}>
              Advanced Filtering
            </h3>
            <p>
              Filter movies by genre, rating, release year, or your custom
              watchlist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
