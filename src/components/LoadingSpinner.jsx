import React, { useState, useEffect } from "react";
import { Link } from "react-router";


import { CircleChevronDown, CircleChevronLeft, CircleChevronRight, Play, Plus, Star } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      year: 2024,
      genre: "Sci-Fi, Adventure",
      rating: 8.9,
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
      img: "https://images.unsplash.com/photo-1602859790151-845f2023bee8",
      alt: "Futuristic desert landscape with golden sand dunes under dramatic orange sky",
      backdrop: "https://images.unsplash.com/photo-1583446687487-724401506575",
      backdropAlt:
        "Epic space battle scene with starships against nebula gray-950",
    },
    {
      id: 2,
      title: "Oppenheimer",
      year: 2023,
      genre: "Biography, Drama",
      rating: 8.7,
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A gripping tale of scientific achievement and moral complexity.",
      img: "https://media.printler.com/media/photo/178903.jpg?rmode=crop&width=725&height=1024",
      alt: "Serious man in suit and hat looking contemplatively at camera in black and white style",
      backdrop:
        "https://www.lueztheater.com/wp-content/uploads/2023/08/Oppenheimer.jpg",
      backdropAlt:
        "Dramatic nuclear explosion mushroom cloud rising into dark sky",
    },
    {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      year: 2023,
      genre: "Animation, Action",
      rating: 9.1,
      description:
        "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
      img: "https://images.unsplash.com/photo-1685638698261-1cd3f3567021",
      alt: "Colorful animated superhero in red and black suit swinging through vibrant city",
      backdrop: "https://images.unsplash.com/photo-1472977876147-21699a56a5a3",
      backdropAlt:
        "Multicolored abstract cityscape with neon lights and geometric patterns",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies?.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredMovies?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies?.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredMovies?.length) % featuredMovies?.length
    );
  };

  const currentMovie = featuredMovies?.[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden bg-gray-950">
      {/* gray-950 Image */}
      <div className="absolute inset-0">
        <img
          src={currentMovie?.backdrop}
          alt={currentMovie?.backdropAlt}
          className="object-cover w-full h-full"
        />

        <div className="absolute inset-0 bg-linear-to-r from-gray-950/90 via-gray-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container px-4 mx-auto lg:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="px-3 py-1 font-medium text-red-600 rounded-full bg-red-600/20">
                    Featured
                  </span>
                  <span>{currentMovie?.year}</span>
                  <span>•</span>
                  <span>{currentMovie?.genre}</span>
                </div>
                <h1 className="text-4xl font-bold text-white lg:text-6xl text-shadow-2xs">
                  {currentMovie?.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {/* <Icon name="Star" size={20} className="" /> */}
                    <Star className="text-yellow-500 fill-current" />
                    <span className="text-lg font-semibold text-yellow-500">
                      {currentMovie?.rating}
                    </span>
                  </div>
                  <span className="text-gray-400">/10</span>
                </div>
              </div>

              <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
                {currentMovie?.description}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="flex items-center px-4 py-3 rounded-lg bg-linear-to-r from-red-600 to-red-900 hover:from-red-600/90 hover:to-red-600/90 cinema-shadow">
                  <Play />
                  <Link to={`/movie-details?id=${currentMovie?.id}`}>
                    Watch Trailer
                  </Link>
                </button>
                <button className="flex items-center px-4 py-3 text-yellow-500 border border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-gray-950">
                  <Plus />
                  Add to Collection
                </button>
              </div>
            </div>

            {/* Movie Poster */}
            <div className="justify-center hidden lg:flex">
              <div className="relative group">
                <div className="w-80 h-[480px] rounded-2xl overflow-hidden  shadow-[0_15px_35px_rgba(212_175_55_0.4)]">
                  <img
                    src={currentMovie?.img}
                    alt={currentMovie?.alt}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-gray-950/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <div className="absolute z-20 transform -translate-x-1/2 bottom-8 left-1/2">
        <div className="flex items-center space-x-4">
          <button
            variant="ghost"
            size="icon"
            iconName="ChevronLeft"
            onClick={prevSlide}
            className="w-12 h-12 text-white bg-gray-950/20 backdrop-blur-sm hover:bg-gray-950/40"
          >
            <CircleChevronLeft />
          </button>

          <div className="flex space-x-2">
            {featuredMovies?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-yellow-500 w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            variant="ghost"
            size="icon"
            iconName="ChevronRight"
            onClick={nextSlide}
            className="w-12 h-12 text-white bg-gray-950/20 backdrop-blur-sm hover:bg-gray-950/40"
          >
            <CircleChevronRight />
          </button>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute z-20 hidden bottom-8 right-8 lg:block">
        <div className="flex flex-col items-center space-y-2 text-gray-400">
          <span className="text-sm font-medium">Scroll</span>
          <div className="w-px h-12 bg-linear-to-b from-gray-400 to-transparent"></div>
          {/* <Icon name="ChevronDown" /> */}
          <CircleChevronDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
