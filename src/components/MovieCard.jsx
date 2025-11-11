import React from "react";
import useAuth from "../hooks/useAuth";
import { Heart, Star } from "lucide-react";
import { NavLink } from "react-router";

const MovieCard = ({ movie }) => {
  const {  isDarkMode } = useAuth();

  return (
    <div>
      <div
        className={`rounded-xl overflow-hidden shadow-xl transition transform hover:scale-105 group ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="relative h-48 md:h-64">
          <img
            src={movie.poster}
            alt={movie.title}
            className="object-cover w-full h-full transition duration-300 group-hover:opacity-80"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x600/4f46e5/ffffff?text=Poster+Not+Found";
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
            //   toggleWatchlist(movie.id);
            }}
            className="absolute p-2 text-white transition transform rounded-full top-2 right-2 bg-black/60 hover:bg-black/80 hover:scale-110"
          >
            <Heart
                          className={`w-5 h-5 `}
                        //   ${
                // watchlist.includes(movie.id)
            //       ? "fill-red-500 text-red-500"
            //       : "text-white"
            //   }
            />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <h3
            className={`text-lg font-bold truncate ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center font-semibold">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                {movie.rating}
              </span>
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {movie.genre}
            </span>
          </div>
          <NavLink to={`/movie-details/${movie._id}`} 
            onClick={() => {
            //   setSelectedMovie(movie);
            //   setCurrentPage("movie-details");
            }}
            className="inline-block w-full px-4 py-2 mt-3 font-medium text-center text-white transition bg-blue-600 shadow-md in rounded-xl hover:bg-blue-700"
          >
            View Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
