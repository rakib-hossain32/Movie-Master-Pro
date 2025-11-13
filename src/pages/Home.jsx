import Statistics from "./Statistics";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import Navbar from "../components/Navbar";
import { Atom } from "react-loading-indicators";
import TopRatedMovies from "./TopRatedMovies";
import RecentlyAdded from "./RecentlyAdded";
import GenreSection from "./GenreSection";

const Home = () => {
  // console.log(movies)

  return (
    <div className="">
      <Navbar />
      <Statistics />
      <TopRatedMovies />
      <RecentlyAdded />
      <GenreSection/>
    </div>
  );
};

export default Home;
