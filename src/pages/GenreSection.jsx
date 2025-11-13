import React from "react";
import useAuth from "../hooks/useAuth";

const genres = [
  { name: "Action", color: "from-red-500 to-orange-500" },
  { name: "Drama", color: "from-purple-500 to-pink-500" },
  { name: "Comedy", color: "from-yellow-400 to-lime-500" },
  { name: "Romance", color: "from-pink-400 to-rose-500" },
  { name: "Horror", color: "from-gray-800 to-black" },
  { name: "Sci-Fi", color: "from-blue-500 to-cyan-400" },
];

const GenreSection = () => {
  const { isDarkMode } = useAuth();

  return (
    <section
      className={`py-12 transition-colors duration-500 my-10  ${
        isDarkMode
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-linear-to-br from-gray-100 via-white to-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl px-6 mx-auto">
        {/* Heading */}
        <h2 className="mb-8 text-4xl font-bold tracking-wide text-center">
          🎬 Explore by{" "}
          <span className={`${isDarkMode ? "text-blue-400" : "text-blue-400"}`}>
            Genre
          </span>
        </h2>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {genres.map((genre, idx) => (
            <div
              key={idx}
              className={`relative group p-5 rounded-2xl bg-linear-to-br ${genre.color} shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
            >
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300  ${
                  isDarkMode
                    ? "bg-black/30 group-hover:bg-black/20"
                    : "bg-black/10 group-hover:bg-black/5"
                }`}
              ></div>
              <h3 className="relative z-10 text-lg font-semibold text-center text-white drop-shadow-md">
                {genre.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
