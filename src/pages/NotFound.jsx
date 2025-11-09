import React, { useState, useEffect, useCallback, useMemo } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// --- Global Firebase Configuration Access ---
const firebaseConfig =
  typeof __firebase_config !== "undefined" ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
const initialAuthToken =
  typeof __initial_auth_token !== "undefined" ? __initial_auth_token : null;

// Mock Data for Initial Setup
const MOCK_MOVIES = [
  {
    id: "1",
    title: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    director: "C. Nolan",
    rating: 8.8,
    posterUrl: "https://placehold.co/400x600/1e293b/cbd5e1?text=Inception",
    language: "English",
    addedBy: "mock-user-1",
    plotSummary: "Dream-sharing technology heist.",
    duration: 148,
    country: "USA",
    cast: "DiCaprio, Gordon-Levitt",
  },
  {
    id: "2",
    title: "The Dark Knight",
    genre: "Action",
    releaseYear: 2008,
    director: "C. Nolan",
    rating: 9.0,
    posterUrl: "https://placehold.co/400x600/1e293b/cbd5e1?text=Dark+Knight",
    language: "English",
    addedBy: "mock-user-2",
    plotSummary: "Batman faces the Joker.",
    duration: 152,
    country: "USA",
    cast: "Bale, Ledger",
  },
  {
    id: "3",
    title: "Pulp Fiction",
    genre: "Crime",
    releaseYear: 1994,
    director: "Q. Tarantino",
    rating: 8.9,
    posterUrl: "https://placehold.co/400x600/1e293b/cbd5e1?text=Pulp+Fiction",
    language: "English",
    addedBy: "mock-user-3",
    plotSummary: "Intertwining criminal tales.",
    duration: 154,
    country: "USA",
    cast: "Travolta, Jackson",
  },
  {
    id: "4",
    title: "Parasite",
    genre: "Drama",
    releaseYear: 2019,
    director: "Bong Joon-ho",
    rating: 8.5,
    posterUrl: "https://placehold.co/400x600/1e293b/cbd5e1?text=Parasite",
    language: "Korean",
    addedBy: "mock-user-4",
    plotSummary: "A poor family infiltrates a rich one.",
    duration: 132,
    country: "South Korea",
    cast: "Song Kang-ho, Choi Woo-shik",
  },
  {
    id: "5",
    title: "Alien",
    genre: "Horror",
    releaseYear: 1979,
    director: "R. Scott",
    rating: 8.4,
    posterUrl: "https://placehold.co/400x600/1e293b/cbd5e1?text=Alien",
    language: "English",
    addedBy: "mock-user-5",
    plotSummary: "Crew encounters a deadly extraterrestrial.",
    duration: 117,
    country: "UK/USA",
    cast: "Sigourney Weaver",
  },
  {
    id: "6",
    title: "Mad Max: Fury Road",
    genre: "Action",
    releaseYear: 2015,
    director: "G. Miller",
    rating: 8.1,
    posterUrl: "https://placehold.co/400x600/1e293b/cbd5e1?text=Mad+Max",
    language: "English",
    addedBy: "mock-user-1",
    plotSummary: "Road warrior aids in escape from warlord.",
    duration: 120,
    country: "Australia/USA",
    cast: "Hardy, Theron",
  },
];

const ALL_GENRES = [
  "Action",
  "Drama",
  "Comedy",
  "Sci-Fi",
  "Crime",
  "Horror",
  "Thriller",
  "Animation",
];

// --- 1. Utility Components (Toast, Modal, Spinner) ---

// Custom Toast Notification Component
function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-[1000] space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-xl shadow-lg transition-all duration-300 transform ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white max-w-sm`}
          role="alert"
          style={{ opacity: 1, transform: "translateX(0)" }}
        >
          <div className="flex items-center">
            {/* Lucide Icons for context */}
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {toast.type === "success" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
            <div className="flex-1">
              <p className="font-semibold">
                {toast?.type?.charAt(0)?.toUpperCase() + toast.type.slice(1)}
              </p>
              <p className="text-sm">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 opacity-75 hover:opacity-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Custom Confirmation Modal Component
function ConfirmationModal({ isOpen, onConfirm, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[1001] p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 transition duration-150 shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// Loading Spinner Component
function Spinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
    </div>
  );
}

// Movie Card Component
function MovieCard({
  movie,
  onViewDetails,
  isOwner,
  onWatchlistToggle,
  isInWatchlist,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full">
      <div className="h-64 relative overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x600/1e293b/cbd5e1?text=No+Poster";
          }}
        />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          ⭐ {movie.rating.toFixed(1)}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {movie.genre} | {movie.releaseYear}
        </p>

        <div className="mt-auto flex justify-between items-center space-x-2">
          <button
            onClick={() => onViewDetails(movie)}
            className="flex-1 py-2 px-3 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-md"
          >
            Details
          </button>
          {onWatchlistToggle && (
            <button
              onClick={() => onWatchlistToggle(movie.id)}
              className={`p-2 rounded-xl transition duration-150 ${
                isInWatchlist
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              title={
                isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
              }
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Bookmark Icon */}
                <path
                  fillRule="evenodd"
                  d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 2. Hooks and State Management ---

// Context-like hook for global state
const useAppState = () => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState({});
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentMovie, setCurrentMovie] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // --- Toast Management ---
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => removeToast(id), 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // --- Theme Toggle ---
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // --- Router Navigation ---
  const navigate = useCallback((page, movie = null) => {
    setCurrentPage(page);
    setCurrentMovie(movie);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0); // Scroll to top on navigation
  }, []);

  // --- Firebase Initialization and Auth ---
  useEffect(() => {
    try {
      if (!Object.keys(firebaseConfig).length) {
        // Fallback for environment where config isn't provided
        console.error("Firebase config is missing. Using mock data.");
        setIsAuthReady(true);
        setMovies(MOCK_MOVIES.map((m) => ({ ...m, addedBy: null }))); // Clear addedBy for safe mock
        return;
      }

      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestoreDb);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async (currentUser) => {
          if (currentUser) {
            // If the user signed in with email/pass or Google, this runs
            setUser(currentUser);
          } else if (initialAuthToken) {
            // Use provided custom token if available (Canvas environment)
            try {
              const userCredential = await signInWithCustomToken(
                firebaseAuth,
                initialAuthToken
              );
              setUser(userCredential.user);
            } catch (error) {
              console.error(
                "Custom token sign-in failed, signing in anonymously:",
                error.message
              );
              await signInAnonymously(firebaseAuth);
              setUser(firebaseAuth.currentUser);
            }
          } else {
            // Fallback to anonymous sign-in
            await signInAnonymously(firebaseAuth);
            setUser(firebaseAuth.currentUser);
          }
          setIsAuthReady(true);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.error("Firebase setup failed:", e);
      // Fallback if setup fails entirely
      setIsAuthReady(true);
      setMovies(MOCK_MOVIES.map((m) => ({ ...m, addedBy: null })));
    }
  }, []);

  // --- Firestore Data Listeners (Movies, Watchlist, Reviews) ---
  useEffect(() => {
    if (!db || !isAuthReady || !user) return;

    const currentUserId = user.uid;

    // 1. Movies Collection Listener (Public Data)
    const moviesColRef = collection(
      db,
      `artifacts/${appId}/public/data/movies`
    );
    const unsubscribeMovies = onSnapshot(
      moviesColRef,
      (snapshot) => {
        const movieData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(movieData);
      },
      (error) => {
        console.error("Error fetching movies:", error);
        addToast("Failed to load movies.", "error");
      }
    );

    // 2. Watchlist Listener (Private Data)
    const watchlistColRef = collection(
      db,
      `artifacts/${appId}/users/${currentUserId}/watchlist`
    );
    const unsubscribeWatchlist = onSnapshot(
      watchlistColRef,
      (snapshot) => {
        const watchlistData = snapshot.docs.map((doc) => doc.id); // Store only movie IDs
        setWatchlist(watchlistData);
      },
      (error) => {
        console.warn(
          "Error fetching watchlist (expected if user has no data):",
          error.message
        );
      }
    );

    // 3. Reviews Listener (Public Data, simple for now)
    const reviewsColRef = collection(
      db,
      `artifacts/${appId}/public/data/reviews`
    );
    const unsubscribeReviews = onSnapshot(
      reviewsColRef,
      (snapshot) => {
        const reviewsMap = {};
        snapshot.docs.forEach((doc) => {
          const review = doc.data();
          if (!reviewsMap[review.movieId]) {
            reviewsMap[review.movieId] = [];
          }
          reviewsMap[review.movieId].push(review);
        });
        setReviews(reviewsMap);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
      }
    );

    return () => {
      unsubscribeMovies();
      unsubscribeWatchlist();
      unsubscribeReviews();
    };
  }, [db, isAuthReady, user, addToast]);

  // --- CRUD Operations ---
  const saveMovie = useCallback(
    async (movieData, isUpdate = false) => {
      if (!db || !user || user.isAnonymous) {
        addToast("You must be logged in to save or update movies.", "error");
        return;
      }
      const movieRef = isUpdate
        ? doc(db, `artifacts/${appId}/public/data/movies`, movieData.id)
        : doc(collection(db, `artifacts/${appId}/public/data/movies`));
      try {
        const dataToSave = {
          ...movieData,
          releaseYear: parseInt(movieData.releaseYear),
          rating: parseFloat(movieData.rating),
          duration: parseInt(movieData.duration),
          timestamp: serverTimestamp(),
          // addedBy must not be updated during an edit
          ...(isUpdate ? {} : { addedBy: user.uid }),
        };

        if (isUpdate) {
          await updateDoc(movieRef, dataToSave);
          addToast("Movie successfully updated!");
        } else {
          await setDoc(movieRef, dataToSave); // Use setDoc to use the generated ID on the new doc ref
          addToast("Movie successfully added!");
        }
        navigate("AllMovies");
      } catch (e) {
        console.error(
          isUpdate ? "Error updating movie: " : "Error adding movie: ",
          e
        );
        addToast(`Failed to ${isUpdate ? "update" : "add"} movie.`, "error");
      }
    },
    [db, user, addToast, navigate]
  );

  const deleteMovie = useCallback(
    async (movieId, movieTitle) => {
      if (!db || !user || user.isAnonymous) {
        addToast("You must be logged in to delete movies.", "error");
        return;
      }
      const movieRef = doc(
        db,
        `artifacts/${appId}/public/data/movies`,
        movieId
      );
      try {
        await deleteDoc(movieRef);
        addToast(`Movie "${movieTitle}" deleted successfully.`);
        navigate("AllMovies");
      } catch (e) {
        console.error("Error deleting movie: ", e);
        addToast("Failed to delete movie.", "error");
      }
    },
    [db, user, addToast, navigate]
  );

  const toggleWatchlist = useCallback(
    async (movieId) => {
      if (!db || !user || user.isAnonymous) {
        addToast("Please log in to manage your Watchlist.", "error");
        return;
      }
      const currentUserId = user.uid;
      const watchlistRef = doc(
        db,
        `artifacts/${appId}/users/${currentUserId}/watchlist`,
        movieId
      );
      try {
        const isCurrentlyInWatchlist = watchlist.includes(movieId);

        if (isCurrentlyInWatchlist) {
          await deleteDoc(watchlistRef);
          addToast("Removed from Watchlist.", "success");
        } else {
          await setDoc(watchlistRef, {
            added: true,
            timestamp: serverTimestamp(),
          });
          addToast("Added to Watchlist!", "success");
        }
      } catch (e) {
        console.error("Error toggling watchlist: ", e);
        addToast("Failed to update Watchlist.", "error");
      }
    },
    [db, user, watchlist, addToast]
  );

  const addReview = useCallback(
    async (movieId, reviewText, rating) => {
      if (!db || !user || user.isAnonymous) {
        addToast("You must be logged in to add a review.", "error");
        return;
      }
      const reviewColRef = collection(
        db,
        `artifacts/${appId}/public/data/reviews`
      );
      try {
        await addDoc(reviewColRef, {
          movieId,
          userId: user.uid,
          userName: user.displayName || "Anonymous User",
          review: reviewText,
          rating: parseFloat(rating),
          timestamp: serverTimestamp(),
        });
        addToast("Review submitted successfully!", "success");
      } catch (e) {
        console.error("Error adding review: ", e);
        addToast("Failed to submit review.", "error");
      }
    },
    [db, user, addToast]
  );

  // Calculate Avg Ratings (Memoized)
  const moviesWithAvgRating = useMemo(() => {
    return movies.map((movie) => {
      const movieReviews = reviews[movie.id] || [];
      const totalRating = movieReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const avgRating =
        movieReviews.length > 0
          ? totalRating / movieReviews.length
          : movie.rating; // Fallback to initial rating
      return {
        ...movie,
        avgRating: parseFloat(avgRating.toFixed(1)),
        reviewCount: movieReviews.length,
        movieReviews, // Attach reviews for easy access in details page
      };
    });
  }, [movies, reviews]);

  return {
    db,
    auth,
    isAuthReady,
    user,
    movies: moviesWithAvgRating,
    watchlist,
    currentPage,
    currentMovie,
    isMobileMenuOpen,
    toasts,
    theme,
    navigate,
    setCurrentMovie,
    setIsMobileMenuOpen,
    addToast,
    removeToast,
    toggleTheme,
    saveMovie,
    deleteMovie,
    toggleWatchlist,
    addReview,
  };
};

// --- 3. UI Components (Navbar, Footer, Pages) ---

// Navbar Component
function Navbar({
  user,
  navigate,
  auth,
  toggleTheme,
  theme,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      navigate("Home");
    }
  };

  const navLinks = [
    { name: "Home", page: "Home" },
    { name: "All Movies", page: "AllMovies" },
    { name: "My Collection", page: "MyCollection", protected: true },
    { name: "Watchlist", page: "Watchlist", protected: true },
    { name: "Add Movie", page: "AddMovie", protected: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Heading */}
          <div
            onClick={() => navigate("Home")}
            className="cursor-pointer flex items-center"
          >
            <h1 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
              MovieMaster{" "}
              <span className="text-gray-900 dark:text-white">Pro</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-4 lg:space-x-8 items-center">
            {navLinks.map(
              (link) =>
                (!link.protected ||
                  (link.protected && user && !user.isAnonymous)) && (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.page)}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-150 font-medium text-sm px-2 py-1"
                  >
                    {link.name}
                  </button>
                )
            )}

            {/* Auth Buttons */}
            {user && !user.isAnonymous ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:shadow-lg transition">
                  <img
                    src={
                      user.photoURL ||
                      `https://placehold.co/40x40/5a67d8/ffffff?text=${
                        user.displayName
                          ? user?.displayName?.charAt(0)
                          : user?.email?.charAt(0)
                      }`
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold hidden lg:inline">
                    {user?.displayName || user?.email?.split("@")[0]}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-xl shadow-xl overflow-hidden hidden group-hover:block transition-all duration-300 z-50 border dark:border-gray-600">
                  <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 truncate border-b dark:border-gray-600">
                    {user.email || "Anonymous"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate("Login")}
                  className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold transition duration-150 shadow-md"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("Register")}
                  className="text-indigo-600 dark:text-indigo-400 bg-transparent border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 px-4 py-2 rounded-xl text-sm font-semibold transition duration-150"
                >
                  Register
                </button>
              </div>
            )}

            {/* Theme Toggle Button (Icon from Lucide) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            >
              {theme === "light" ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            >
              {theme === "light" ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Collapsible Sidebar */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-screen border-t dark:border-gray-700"
            : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900">
          {navLinks.map(
            (link) =>
              (!link.protected ||
                (link.protected && user && !user.isAnonymous)) && (
                <button
                  key={link.name}
                  onClick={() => navigate(link.page)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
                >
                  {link.name}
                </button>
              )
          )}
          <div className="pt-4 border-t dark:border-gray-700">
            {user && !user.isAnonymous ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition duration-150"
              >
                Logout ({user?.displayName || user?.email?.split("@")[0]})
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => navigate("Login")}
                  className="w-full text-center px-3 py-2 rounded-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("Register")}
                  className="w-full text-center px-3 py-2 rounded-xl text-base font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Footer Component
function Footer({ navigate }) {
  // SVG for the new X logo
  const X_LOGO_SVG = (
    <svg
      className="w-5 h-5"
      viewBox="0 0 1200 1227"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L485.871 712.513L0 1227H105.861L515.491 750.218L882.721 1227H1200L714.163 519.284ZM569.165 687.828L521.697 621.95L144.029 79.664H306.602L624.815 470.364L672.327 536.236L1055.05 1150.33H892.476L569.165 687.828Z" />
    </svg>
  );

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-700 mt-12 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate("AllMovies")}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  All Movies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("MyCollection")}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  My Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("Watchlist")}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Watchlist
                </button>
              </li>
            </ul>
          </div>
          {/* Platform Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              MovieMaster Pro Headquarters
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              123 Cinema Lane, Hollywood, CA 90210
            </p>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} MovieMaster Pro. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="X (formerly Twitter)"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              {X_LOGO_SVG}
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.772 1.66 4.92 4.912.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.252-1.66 4.772-4.912 4.92-.15.058-.53.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.772-1.66-4.92-4.912-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.252 1.66-4.772 4.912-4.92.21-.058.42-.06.75-.06zM12 18c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm-2.73-4.34a1 1 0 11-1.414-1.414l5.46-5.46a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414l-5.46 5.46a1 1 0 01-1.414 0z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.04C6.54 2.04 2.04 6.54 2.04 12c0 5.46 4.5 9.96 9.96 9.96 5.46 0 9.96-4.5 9.96-9.96 0-5.46-4.5-9.96-9.96-9.96zm2.49 5.56h-2.12c-.52 0-.84.23-.84.76v1.44h2.95l-.39 2.94h-2.56v7.12h-3.08v-7.12h-1.52v-2.94h1.52v-1.92c0-1.54 1.14-2.79 2.74-2.79h2.34v2.79z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Home Page Component
function HomePage({ movies, navigate, user }) {
  const totalMovies = movies.length;
  const totalUsers = 1 + (user && !user.isAnonymous ? 1 : 0); // Mocking users count
  const topRatedMovies = useMemo(
    () => [...movies].sort((a, b) => b.avgRating - a.avgRating).slice(0, 5),
    [movies]
  );
  const recentlyAddedMovies = useMemo(
    () =>
      [...movies]
        .sort(
          (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
        )
        .slice(0, 6),
    [movies]
  );

  const HeroSection = () => (
    <div className="bg-indigo-700 dark:bg-gray-800 text-white rounded-xl shadow-xl p-8 md:p-16 mb-12 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/000000/ffffff?text=Cinema+Background')",
        }}
      ></div>
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
          Discover Your Next Favorite Film
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-indigo-200 dark:text-indigo-300">
          MovieMaster Pro: Comprehensive management for your cinematic universe.
        </p>
        <button
          onClick={() => navigate("AllMovies")}
          className="px-8 py-3 bg-white text-indigo-700 text-lg font-bold rounded-xl hover:bg-gray-100 transition duration-300 shadow-2xl transform hover:scale-105"
        >
          Explore All Movies
        </button>
      </div>
    </div>
  );

  const StatsSection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
      <StatCard title="Total Movies" value={totalMovies} icon="🎥" />
      <StatCard title="Total Users" value={totalUsers} icon="👥" />
      <StatCard title="Avg Rating" value="8.7+" icon="✨" />
    </div>
  );

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-b-4 border-indigo-500 dark:border-indigo-400 flex items-center space-x-4">
      <span className="text-4xl">{icon}</span>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  const MovieCarousel = ({ title, moviesToShow }) => (
    <div className="mb-12">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-600 pl-4">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {moviesToShow.map((movie) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 transition hover:shadow-xl cursor-pointer"
            onClick={() => navigate("MovieDetails", movie)}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-auto rounded-lg mb-3"
            />
            <p className="font-semibold text-sm truncate text-gray-900 dark:text-white">
              {movie.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ⭐ {movie.avgRating.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const GenreSection = () => (
    <div className="mb-12">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-600 pl-4">
        Explore Genres
      </h3>
      <div className="flex flex-wrap gap-3">
        {ALL_GENRES.map((genre) => (
          <span
            key={genre}
            className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium shadow-sm transition hover:bg-indigo-200 dark:hover:bg-indigo-700 cursor-pointer"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );

  const AboutPlatformSection = () => (
    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-inner">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        About MovieMaster Pro
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        MovieMaster Pro is your dedicated platform for cinematic organization.
        We offer real-time data sync, advanced search capabilities, and
        personalized collections, ensuring you never lose track of a great film.
        From detailed viewing histories to collaborative community reviews,
        manage your entire movie experience in one beautiful interface.
      </p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection />
      <StatsSection />
      <MovieCarousel title="Top 5 Rated Movies" moviesToShow={topRatedMovies} />
      <MovieCarousel
        title="Recently Added"
        moviesToShow={recentlyAddedMovies}
      />
      <GenreSection />
      <AboutPlatformSection />
    </div>
  );
}

// Advanced Search and Filtering Component
function AdvancedFilter({ movies, setFilteredMovies, isLoading }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce for Search Term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Genre Toggle
  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Filtering Logic
  useEffect(() => {
    let newFiltered = movies;

    // 1. Genre Filtering ($in operator equivalent)
    if (selectedGenres.length > 0) {
      newFiltered = newFiltered.filter((movie) =>
        selectedGenres.includes(movie.genre)
      );
    }

    // 2. Rating Range Filtering ($gte and $lte equivalent)
    newFiltered = newFiltered.filter(
      (movie) =>
        movie.avgRating >= ratingRange[0] && movie.avgRating <= ratingRange[1]
    );

    // 3. Search Term Filtering
    if (debouncedSearchTerm.length > 0) {
      const lowerCaseSearch = debouncedSearchTerm.toLowerCase();
      newFiltered = newFiltered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(lowerCaseSearch) ||
          movie.director.toLowerCase().includes(lowerCaseSearch) ||
          movie.cast.toLowerCase().includes(lowerCaseSearch)
      );
    }

    setFilteredMovies(newFiltered);
  }, [
    movies,
    selectedGenres,
    ratingRange,
    debouncedSearchTerm,
    setFilteredMovies,
  ]);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-inner mb-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Advanced Filters
      </h3>

      {/* Search Bar with Suggestions Mock */}
      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Movies (Title, Director, Cast)
        </label>
        <input
          type="text"
          placeholder="e.g., Inception, Nolan, DiCaprio"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          disabled={isLoading}
        />
        {/* Mock suggestion list */}
        {searchTerm.length > 2 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-10">
            {movies
              .filter((m) =>
                m.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 3)
              .map((m) => (
                <div
                  key={m.id}
                  className="p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer rounded-xl"
                >
                  {m.title}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Genre (Multi-select)
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition duration-150 ${
                selectedGenres.includes(genre)
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Range Filter (Simplified Slider Mock) */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating Range: {ratingRange[0].toFixed(1)} to{" "}
          {ratingRange[1].toFixed(1)}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={ratingRange[0]}
          onChange={(e) =>
            setRatingRange([
              parseFloat(e.target.value),
              ratingRange[1] < parseFloat(e.target.value)
                ? parseFloat(e.target.value)
                : ratingRange[1],
            ])
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700 accent-indigo-600 transition"
        />
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={ratingRange[1]}
          onChange={(e) =>
            setRatingRange([
              ratingRange[0] > parseFloat(e.target.value)
                ? parseFloat(e.target.value)
                : ratingRange[0],
              parseFloat(e.target.value),
            ])
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700 accent-indigo-600 transition"
        />
      </div>
    </div>
  );
}

// Custom hook for debouncing a value
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// All Movies Page Component
function AllMoviesPage({
  movies,
  navigate,
  toggleWatchlist,
  watchlist,
  isAuthReady,
}) {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const isLoading = !isAuthReady;

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        All Movies
      </h2>

      <AdvancedFilter
        movies={movies}
        setFilteredMovies={setFilteredMovies}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onViewDetails={navigate}
              onWatchlistToggle={toggleWatchlist}
              isInWatchlist={watchlist.includes(movie.id)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No movies found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// My Collection Page Component (Movies added by the user)
function MyCollectionPage({
  movies,
  navigate,
  user,
  deleteMovie,
  addToast,
  isAuthReady,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const ownedMovies = useMemo(() => {
    if (!user || user.isAnonymous) return [];
    return movies.filter((movie) => movie.addedBy === user.uid);
  }, [movies, user]);

  const openDeleteModal = (movie) => {
    setMovieToDelete(movie);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (movieToDelete) {
      deleteMovie(movieToDelete.id, movieToDelete.title);
      setModalOpen(false);
      setMovieToDelete(null);
    }
  };

  if (!isAuthReady) return <Spinner />;

  if (!user || user.isAnonymous) {
    return (
      <AuthRequiredMessage
        navigate={navigate}
        title="My Collection"
        message="You need to log in to view your personal movie collection."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        My Collection
      </h2>

      {ownedMovies.length === 0 ? (
        <div className="py-12 text-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            You haven't added any movies yet!
          </p>
          <button
            onClick={() => navigate("AddMovie")}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-150 shadow-md"
          >
            Add Your First Movie
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ownedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col overflow-hidden h-full"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <p className="text-xl font-bold truncate text-gray-900 dark:text-white mb-1">
                  {movie.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ⭐ {movie.avgRating.toFixed(1)}
                </p>

                <div className="mt-auto flex justify-between space-x-2 pt-3">
                  <button
                    onClick={() => navigate("EditMovie", movie)}
                    className="flex-1 py-2 text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 transition shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(movie)}
                    className="flex-1 py-2 text-sm font-semibold rounded-xl text-white bg-red-600 hover:bg-red-700 transition shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to permanently delete the movie "${movieToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

// Watchlist Page Component
function WatchlistPage({
  movies,
  navigate,
  user,
  watchlist,
  toggleWatchlist,
  isAuthReady,
}) {
  const watchlistMovies = useMemo(() => {
    if (!user || user.isAnonymous) return [];
    const watchlistedIds = new Set(watchlist);
    return movies.filter((movie) => watchlistedIds.has(movie.id));
  }, [movies, user, watchlist]);

  if (!isAuthReady) return <Spinner />;

  if (!user || user.isAnonymous) {
    return (
      <AuthRequiredMessage
        navigate={navigate}
        title="My Watchlist"
        message="You need to log in to manage your movie watchlist."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        My Watchlist ({watchlistMovies.length})
      </h2>

      {watchlistMovies.length === 0 ? (
        <div className="py-12 text-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Your watchlist is empty!
          </p>
          <button
            onClick={() => navigate("AllMovies")}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-150 shadow-md"
          >
            Start Browsing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlistMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onViewDetails={navigate}
              onWatchlistToggle={toggleWatchlist}
              isInWatchlist={true} // Always true for this page
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Movie Details Page Component
function MovieDetailsPage({
  movie,
  user,
  navigate,
  deleteMovie,
  addReview,
  addToast,
  isAuthReady,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ reviewText: "", rating: 5 });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const isOwner = user && movie.addedBy === user.uid;
  const isLoggedIn = user && !user.isAnonymous;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (
      !reviewForm.reviewText.trim() ||
      reviewForm.rating < 1 ||
      reviewForm.rating > 10
    ) {
      addToast("Please provide a valid review and rating (1-10).", "error");
      return;
    }
    setIsSubmittingReview(true);
    await addReview(movie.id, reviewForm.reviewText, reviewForm.rating);
    setReviewForm({ reviewText: "", rating: 5 });
    setIsSubmittingReview(false);
  };

  const openDeleteModal = () => setModalOpen(true);
  const handleConfirmDelete = () => {
    deleteMovie(movie.id, movie.title);
    setModalOpen(false);
  };

  if (!movie)
    return (
      <div className="p-8 text-center text-red-500">
        Error: Movie data missing.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-6 md:p-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Poster and Owner Info */}
          <div className="md:col-span-1">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-auto rounded-xl shadow-lg mb-6 transform hover:scale-[1.01] transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x600/1e293b/cbd5e1?text=No+Poster";
              }}
            />
            {isOwner && (
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("EditMovie", movie)}
                  className="flex-1 py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition shadow-md"
                >
                  Edit Movie
                </button>
                <button
                  onClick={openDeleteModal}
                  className="flex-1 py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition shadow-md"
                >
                  Delete Movie
                </button>
              </div>
            )}
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Added By: {movie.addedBy}
            </p>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {movie.title} ({movie.releaseYear})
            </h2>

            <div className="flex items-center space-x-4 text-2xl mb-6">
              <span className="text-yellow-500 font-bold">
                ⭐ {movie.avgRating.toFixed(1)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">|</span>
              <span className="text-gray-600 dark:text-gray-300">
                {movie.reviewCount} Reviews
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-lg mb-8">
              <DetailItem label="Genre" value={movie.genre} />
              <DetailItem label="Director" value={movie.director} />
              <DetailItem label="Duration" value={`${movie.duration} min`} />
              <DetailItem label="Language" value={movie.language} />
              <DetailItem label="Country" value={movie.country} />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Cast
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {movie.cast}
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Plot Summary
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {movie.plotSummary}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10 pt-8 border-t dark:border-gray-700">
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            User Reviews ({movie.reviewCount})
          </h3>

          {/* Review Submission Form */}
          {isLoggedIn ? (
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-8 shadow-inner">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Leave a Review
              </h4>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Rating (1-10)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    min="1"
                    max="10"
                    step="0.5"
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        rating: parseFloat(e.target.value),
                      }))
                    }
                    className="mt-1 block w-full md:w-1/3 p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="reviewText"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Thoughts
                  </label>
                  <textarea
                    id="reviewText"
                    rows="3"
                    value={reviewForm.reviewText}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        reviewText: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition"
                    placeholder="Tell us what you thought..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-150 shadow-md disabled:opacity-50"
                >
                  {isSubmittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-600 rounded-xl mb-8 text-yellow-800 dark:text-yellow-300">
              <p className="text-sm">
                Please{" "}
                <button
                  onClick={() => navigate("Login")}
                  className="underline font-semibold"
                >
                  log in
                </button>{" "}
                to submit a review and rating.
              </p>
            </div>
          )}

          {/* List of Reviews */}
          <div className="space-y-6">
            {movie.movieReviews && movie.movieReviews.length > 0 ? (
              movie.movieReviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b dark:border-gray-700 pb-4 last:border-b-0"
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {review.userName}
                    </p>
                    <span className="text-sm text-yellow-500 font-bold">
                      ⭐ {review.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.review}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {review.timestamp
                      ? new Date(
                          review.timestamp.seconds * 1000
                        ).toLocaleDateString()
                      : "Just now"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Be the first to leave a review!
              </p>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to permanently delete "${movie.title}"?`}
      />
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}:
      </span>
      <p className="text-gray-900 dark:text-white font-medium">{value}</p>
    </div>
  );
}

// Add/Edit Movie Form Component
function AddEditMoviePage({
  movieToEdit,
  navigate,
  saveMovie,
  isAuthReady,
  user,
  addToast,
}) {
  const isUpdate = !!movieToEdit;
  const initialMovie = movieToEdit || {
    id: "",
    title: "",
    genre: ALL_GENRES[0],
    releaseYear: "",
    director: "",
    cast: "",
    rating: 5.0,
    duration: "",
    plotSummary: "",
    posterUrl: "https://placehold.co/400x600/1e293b/cbd5e1?text=Movie+Poster",
    language: "English",
    country: "USA",
  };
  const [formData, setFormData] = useState(initialMovie);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.isAnonymous) {
      addToast("You must be logged in to save or update movies.", "error");
      return;
    }
    setIsSubmitting(true);
    // Validation (simple check)
    if (!formData.title || !formData.director || !formData.plotSummary) {
      addToast("Please fill in all required fields.", "error");
      setIsSubmitting(false);
      return;
    }

    await saveMovie(formData, isUpdate);
    setIsSubmitting(false);
  };

  if (!isAuthReady) return <Spinner />;

  if (!user || user.isAnonymous) {
    return (
      <AuthRequiredMessage
        navigate={navigate}
        title={isUpdate ? "Edit Movie" : "Add New Movie"}
        message="You need to log in to manage movie submissions."
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        {isUpdate ? "Edit Movie" : "Add New Movie"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6"
      >
        {/* Title and Director */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            name="director"
            label="Director"
            value={formData.director}
            onChange={handleChange}
            required
          />
        </div>

        {/* Release Year, Duration, Rating */}
        <div className="grid md:grid-cols-3 gap-6">
          <Input
            name="releaseYear"
            label="Release Year"
            type="number"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
          <Input
            name="duration"
            label="Duration (min)"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          <Input
            name="rating"
            label="Initial Rating (1-10)"
            type="number"
            min="1"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        {/* Genre, Language, Country */}
        <div className="grid md:grid-cols-3 gap-6">
          <Select
            name="genre"
            label="Genre"
            value={formData.genre}
            onChange={handleChange}
            options={ALL_GENRES}
            required
          />
          <Input
            name="language"
            label="Language"
            value={formData.language}
            onChange={handleChange}
            required
          />
          <Input
            name="country"
            label="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cast and Poster URL */}
        <Input
          name="cast"
          label="Cast (Comma Separated)"
          value={formData.cast}
          onChange={handleChange}
          required
        />
        <Input
          name="posterUrl"
          label="Poster Image URL"
          value={formData.posterUrl}
          onChange={handleChange}
        />

        {/* Plot Summary */}
        <div>
          <label
            htmlFor="plotSummary"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Plot Summary
          </label>
          <textarea
            id="plotSummary"
            name="plotSummary"
            rows="4"
            value={formData.plotSummary}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            required
          ></textarea>
        </div>

        {/* Added By (Read-only/Hidden in update, set automatically on new) */}
        {isUpdate && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Added By: {movieToEdit.addedBy} (Cannot be edited)
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() =>
              navigate(isUpdate ? "MovieDetails" : "AllMovies", movieToEdit)
            }
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-150 shadow-lg disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : isUpdate
              ? "Update Movie"
              : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Generic Form Input Component
function Input({
  name,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  min,
  max,
  step,
  error = null,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
        className={`w-full p-3 border ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
        } rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Generic Select Component
function Select({ name, label, value, onChange, options, required = false }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 appearance-none pr-8"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// Auth Pages (Login/Register)
function LoginPage({ navigate, auth, addToast }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!auth) throw new Error("Authentication service not ready.");
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      addToast("Login successful!", "success");
      navigate("Home");
    } catch (error) {
      console.error("Login error:", error.message);
      addToast(
        `Login failed: ${error.message.replace("Firebase:", "").trim()}`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock Google Login
  const handleGoogleLogin = () => {
    addToast(
      "Google Sign-In is a complex process and requires a multi-file setup. Please use Email/Password for this demo.",
      "error"
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 py-12">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <p className="text-right text-sm text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">
            Forgot Password? (Visual Only)
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-150 shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t dark:border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">
            OR
          </span>
          <div className="flex-grow border-t dark:border-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 shadow-sm"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
            <path
              fill="#fbc02d"
              d="M43.6 24.3c0-1.7-.1-3.3-.3-4.8H24v9.2h10.9c-.4 2.1-1.6 3.9-3.3 5.1v6.7h8.7c5.1-4.7 8-11.7 8-19.2z"
            />
            <path
              fill="#e53935"
              d="M24 43.4c6.3 0 11.6-2.1 15.5-5.7l-8.7-6.7c-2.4 1.6-5.5 2.5-8.8 2.5-6.8 0-12.7-4.5-14.8-10.7H1.3v6.9c4.2 8.4 13.1 14.2 22.7 14.2z"
            />
            <path
              fill="#4caf50"
              d="M9.2 24c0-1.7.3-3.3.8-4.8V12.3H1.3c-1.5 3-2.3 6.4-2.3 9.7s.8 6.8 2.3 9.7l7.9-.1c-.5-1.5-.8-3.1-.8-4.8z"
            />
            <path
              fill="#1976d2"
              d="M24 7.6c3.4 0 6.5 1.1 8.9 3.3l7.3-7.3C36.6 2.3 30.7 0 24 0 14.4 0 5.5 5.8 1.3 14.2l7.9 6.1c2.1-6.2 8-10.7 14.8-10.7z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("Register")}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition"
          >
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
}

function RegisterPage({ navigate, auth, addToast }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const newErrors = {};
    if (password.length < 6)
      newErrors.length = "Must be at least six characters long.";
    if (!/[A-Z]/.test(password))
      newErrors.uppercase = "Must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      newErrors.lowercase = "Must contain at least one lowercase letter.";
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      addToast("Passwords do not match.", "error");
      setErrors({ confirm: "Passwords do not match." });
      return;
    }

    const passwordErrors = validatePassword(formData.password);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors({ password: Object.values(passwordErrors).join(" ") });
      addToast("Password validation failed.", "error");
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      if (!auth) throw new Error("Authentication service not ready.");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update User Profile (Name and Photo URL)
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL:
          formData.photoURL ||
          `https://placehold.co/40x40/5a67d8/ffffff?text=${formData?.name?.charAt(
            0
          )}`,
      });

      addToast(
        "Registration successful! Welcome to MovieMaster Pro.",
        "success"
      );
      navigate("Home");
    } catch (error) {
      console.error("Registration error:", error.message);
      addToast(
        `Registration failed: ${error.message.replace("Firebase:", "").trim()}`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock Google Login
  const handleGoogleLogin = () => {
    addToast(
      "Google Sign-In is a complex process and requires a multi-file setup. Please use Email/Password for this demo.",
      "error"
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 py-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="photoURL"
            label="Photo URL (Optional)"
            value={formData.photoURL}
            onChange={handleChange}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 -mt-2 space-y-0.5">
            <p>- Must be at least six characters long</p>
            <p>- Must contain at least one uppercase letter</p>
            <p>- Must contain at least one lowercase letter</p>
          </div>

          <Input
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
            error={errors.confirm}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-150 shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t dark:border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">
            OR
          </span>
          <div className="flex-grow border-t dark:border-gray-700"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 shadow-sm"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
            <path
              fill="#fbc02d"
              d="M43.6 24.3c0-1.7-.1-3.3-.3-4.8H24v9.2h10.9c-.4 2.1-1.6 3.9-3.3 5.1v6.7h8.7c5.1-4.7 8-11.7 8-19.2z"
            />
            <path
              fill="#e53935"
              d="M24 43.4c6.3 0 11.6-2.1 15.5-5.7l-8.7-6.7c-2.4 1.6-5.5 2.5-8.8 2.5-6.8 0-12.7-4.5-14.8-10.7H1.3v6.9c4.2 8.4 13.1 14.2 22.7 14.2z"
            />
            <path
              fill="#4caf50"
              d="M9.2 24c0-1.7.3-3.3.8-4.8V12.3H1.3c-1.5 3-2.3 6.4-2.3 9.7s.8 6.8 2.3 9.7l7.9-.1c-.5-1.5-.8-3.1-.8-4.8z"
            />
            <path
              fill="#1976d2"
              d="M24 7.6c3.4 0 6.5 1.1 8.9 3.3l7.3-7.3C36.6 2.3 30.7 0 24 0 14.4 0 5.5 5.8 1.3 14.2l7.9 6.1c2.1-6.2 8-10.7 14.8-10.7z"
            />
          </svg>
          Sign up with Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("Login")}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition"
          >
            Login Here
          </button>
        </p>
      </div>
    </div>
  );
}

// 404 Not Found Page
function NotFoundPage({ navigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="p-12 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          The movie or page you are looking for does not exist or an error
          occurred.
        </p>
        <button
          onClick={() => navigate("Home")}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-150 shadow-md transform hover:scale-105"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

// Authorization Required Component
function AuthRequiredMessage({ navigate, title, message }) {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="p-10 bg-yellow-50 dark:bg-gray-800 border-2 border-yellow-300 dark:border-yellow-600 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {message}
        </p>
        <button
          onClick={() => navigate("Login")}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-150 shadow-md"
        >
          Log In Now
        </button>
      </div>
    </div>
  );
}

// --- 4. Main App Component ---

// React Error Boundary (Simplified)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl m-8 border border-red-400">
          <h1 className="text-2xl font-bold mb-4">Application Error</h1>
          <p>Something went wrong. Please try navigating to the home page.</p>
          <pre className="mt-4 text-xs whitespace-pre-wrap text-left">
            {this.state.error.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const {
    auth,
    user,
    isAuthReady,
    movies,
    watchlist,
    currentPage,
    currentMovie,
    isMobileMenuOpen,
    toasts,
    theme,
    navigate,
    setIsMobileMenuOpen,
    addToast,
    removeToast,
    toggleTheme,
    saveMovie,
    deleteMovie,
    toggleWatchlist,
    addReview,
  } = useAppState();

  const isLoggedIn = user && !user.isAnonymous;

  // --- Main Content Renderer (Router) ---
  const renderPage = () => {
    if (!isAuthReady) return <Spinner />;

    // Protected Route Check
    if (
      (currentPage === "MyCollection" ||
        currentPage === "Watchlist" ||
        currentPage === "AddMovie") &&
      !isLoggedIn
    ) {
      return (
        <AuthRequiredMessage
          navigate={navigate}
          title="Access Restricted"
          message="Please log in to access this page."
        />
      );
    }

    // Movie Details/Edit Check (handle navigation via state)
    if (currentPage === "MovieDetails" && currentMovie) {
      return (
        <ErrorBoundary>
          <MovieDetailsPage
            movie={currentMovie}
            user={user}
            navigate={navigate}
            deleteMovie={deleteMovie}
            addReview={addReview}
            addToast={addToast}
            isAuthReady={isAuthReady}
          />
        </ErrorBoundary>
      );
    }
    if (currentPage === "EditMovie" && currentMovie) {
      // Owner Check is enforced in MyCollectionPage logic and form submission itself
      return (
        <AddEditMoviePage
          movieToEdit={currentMovie}
          navigate={navigate}
          saveMovie={saveMovie}
          isAuthReady={isAuthReady}
          user={user}
          addToast={addToast}
        />
      );
    }

    switch (currentPage) {
      case "Home":
        return <HomePage movies={movies} navigate={navigate} user={user} />;
      case "AllMovies":
        return (
          <AllMoviesPage
            movies={movies}
            navigate={navigate}
            toggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
            isAuthReady={isAuthReady}
          />
        );
      case "MyCollection":
        return (
          <MyCollectionPage
            movies={movies}
            navigate={navigate}
            user={user}
            deleteMovie={deleteMovie}
            addToast={addToast}
            isAuthReady={isAuthReady}
          />
        );
      case "Watchlist":
        return (
          <WatchlistPage
            movies={movies}
            navigate={navigate}
            user={user}
            watchlist={watchlist}
            toggleWatchlist={toggleWatchlist}
            isAuthReady={isAuthReady}
          />
        );
      case "AddMovie":
        return (
          <AddEditMoviePage
            navigate={navigate}
            saveMovie={saveMovie}
            isAuthReady={isAuthReady}
            user={user}
            addToast={addToast}
          />
        );
      case "Login":
        return (
          <LoginPage navigate={navigate} auth={auth} addToast={addToast} />
        );
      case "Register":
        return (
          <RegisterPage navigate={navigate} auth={auth} addToast={addToast} />
        );
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 font-inter transition-colors duration-300">
      <Navbar
        user={user}
        navigate={navigate}
        auth={auth}
        toggleTheme={toggleTheme}
        theme={theme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-grow">{renderPage()}</main>

      <Footer navigate={navigate} />

      {/* Global Components */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

// Log Firestore debugging information
// import { setLogLevel } from "firebase/firestore";
// setLogLevel('Debug');
