import {
  ChevronLeft,
  Clock,
  Edit,
  Globe,
  Heart,
  Star,
  Trash2,
  Calendar,
  User,
  Film,
  Play,
  Share2,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import InfoCard from "./InfoCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: movieData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/movies/${id}`);
      return res.data;
    },
  });

  // console.log(movieData);

  const { data: watchlistData, refetch: refetchWatchlist } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/watchlist/${movieData?._id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  // console.log(watchlistData);
  // console.log(Boolean(watchlistData));

  // --- Data Fetching ---

  // --- Handlers ---
  const handleMovieDelete = () => {
    Swal.fire({
      title: "Delete this masterpiece?",
      text: "This action cannot be undone.",
      icon: "warning",
      background: "#1a1a1a",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#D90429",
      cancelButtonColor: "#333",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/movies/${id}`).then((data) => {
          if (data.data.deletedCount) {
            navigate("/all-movies");
          }
        });
      }
    });
  };

  const handleAddWatchlist = () => {
    const movieDataInfo = {
      title: movieData?.title,
      id: movieData?._id,
      email: user?.email,
    };
    axiosSecure.post("/watchlist-create", movieDataInfo).then((data) => {
      if (data.data.insertedId) {
        refetch();
        refetchWatchlist();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#D90429",
          color: "#fff",
        });
        Toast.fire({ icon: "success", title: "Added to Watchlist" });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  // (
  //     <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
  //       <div className="flex flex-col items-center gap-4">
  //         <span className="loading loading-ring loading-lg text-primary scale-150"></span>
  //         <p className="text-white/50 text-sm tracking-widest uppercase animate-pulse">
  //           Loading Experience
  //         </p>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-base-100 pb-20 relative overflow-x-hidden">
      {/* =========================================
          1. IMMERSIVE HERO BANNER (Top 60% of screen)
      ========================================= */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105 opacity-60"
          style={{ backgroundImage: `url(${movieData.poster})` }}
        />
        {/* Cinematic linear Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 to-transparent" />

        {/* Top Navigation */}
        <div className="mt-30   px-6 max-w-7xl mx-auto  flex justify-between items-center">
          <button
            onClick={() => navigate("/all-movies")}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white font-bold transition-all"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Share Button (Visual Only) */}
          <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Content (Title & Meta) */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-70 z-20 max-w-7xl mx-auto flex flex-col items-center md:items-start text-center md:text-left">
          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl mb-4"
          >
            {movieData.title}
          </motion.h1>

          {/* Meta Data Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/90 font-medium text-sm md:text-base"
          >
            <span className="px-3 py-1 rounded bg-primary text-white font-bold uppercase tracking-wider text-xs">
              {movieData.genre?.split(",")[0]}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" /> {movieData.year}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" /> {movieData.runtime} min
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="flex items-center gap-1.5 text-yellow-400">
              <Star className="w-4 h-4 fill-current" /> {movieData.rating}
            </span>
          </motion.div>
        </div>
      </div>

      {/* =========================================
          2. MAIN CONTENT LAYER (Floating)
      ========================================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-60">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* --- LEFT: Floating Poster & Actions --- */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Poster Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow border-4 border-base-100 group"
            >
              <img
                src={movieData.poster}
                alt={movieData.title}
                className="w-full h-auto object-cover"
              />
              {/* Hover Play Icon overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center pl-1 shadow-xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
            </motion.div>

            {/* Primary Actions */}
            <div className="flex flex-col gap-3">
              <button
                disabled={watchlistData}
                onClick={handleAddWatchlist}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95  ${
                  watchlistData
                    ? "bg-base-200 text-base-content/50 cursor-not-allowed"
                    : "bg-linear-to-r from-primary to-red-700 text-white hover:shadow-primary/40 cursor-pointer"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${watchlistData ? "fill-current" : ""}`}
                />
                {watchlistData ? "Added to Library" : "Add to Watchlist"}
              </button>

              {/* Editor Actions (Only for owner) */}
              {user?.email === movieData.addedBy && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate(`/edit-movie/${movieData._id}`)}
                    className="py-3 rounded-xl bg-base-200 hover:bg-base-300 text-base-content font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={handleMovieDelete}
                    className="py-3 rounded-xl bg-base-200 hover:bg-red-100 hover:text-red-600 text-base-content font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT: Detailed Info --- */}
          <div className="lg:col-span-8 pt-6  space-y-10">
            {/* Plot Summary */}
            <section>
              <h3 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                The Storyline
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed font-light">
                {movieData.description}
              </p>
            </section>

            {/* Info Cards (Bento Grid) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard
                icon={User}
                label="Director"
                value={movieData.director}
                sub="Visionary"
              />
              <InfoCard
                icon={Film}
                label="Country"
                value={movieData.country}
                sub="Origin"
              />
              <InfoCard
                icon={Globe}
                label="Language"
                value={movieData.language}
                sub="Audio"
              />
              <InfoCard
                icon={User}
                label="Added By"
                value={movieData.addedBy?.split("@")[0]}
                sub="Curator"
              />
            </section>

            {/* Cast Section (Visual) */}
            <section>
              <h3 className="text-xl font-bold text-base-content mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Top Cast
              </h3>
              <div className="flex flex-wrap gap-4">
                {/* Assuming cast is a comma separated string, we split it. If array, just map. */}
                {movieData.cast.map((actor, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 pr-6 rounded-full bg-base-200/50 border border-base-content/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-base-content/50 font-bold">
                      {actor.trim().charAt(0)}
                    </div>
                    <span className="font-bold text-base-content/80">
                      {actor.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
