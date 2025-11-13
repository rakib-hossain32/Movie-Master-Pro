import React from 'react';
import { NavLink,  } from 'react-router';
import Navigation from './Navigation/Navigation';

const PageNotFound = () => {

    // const location = useLocation()
    // console.log(location)
    
    return (
      //   <div>

      //       <div className="bg-linear-to-r from-purple-300 to-blue-200">
      //         <div className="flex items-center justify-center w-9/12 min-h-screen py-16 m-auto">
      //           <div className="pb-8 overflow-hidden bg-white shadow sm:rounded-lg">
      //             <div className="pt-8 text-center border-t border-gray-200">
      //               <h1 className="font-bold text-purple-400 text-9xl">404</h1>
      //               <h1 className="py-8 text-6xl font-medium">
      //                 oops! Page not found
      //               </h1>
      //               <p className="px-12 pb-8 text-2xl font-medium">
      //                 Oops! The page you are looking for does not exist. It might
      //                 have been moved or deleted.
      //               </p>
      //               <button className="px-6 py-3 mr-6 font-semibold text-white rounded-md bg-linear-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
      //                 HOME
      //               </button>
      //               <button className="px-6 py-3 font-semibold text-white rounded-md bg-linear-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500">
      //                 Contact Us
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>

      //   </div>
        <div className="">
            <Navigation />
        <main className="grid min-h-screen px-6 py-24 bg-gray-900 place-items-center sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-400">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white text-balance sm:text-7xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-400 text-pretty sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <NavLink
                to={"/"}
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Go back home
              </NavLink>
              <NavLink to={"/"} className="text-sm font-semibold text-white">
                Contact support <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    );
};

export default PageNotFound;