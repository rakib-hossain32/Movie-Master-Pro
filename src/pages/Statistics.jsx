import React from 'react';

const Statistics = () => {

    const statistics = [
      {
        title: "Total Movies",
        value: 4,
        icon: "🎥",
        description: "Comprehensive collection",
      },
      {
        title: "Total Users",
        value: 3,
        icon: "👥",
        description: "Growing community",
      },
      {
        title: "Avg Rating",
        value: "8.7+",
        icon: "✨",
        description: "User-generated content",
      },
    ];

    return (
      <div className="mx-auto mt-10 mb-16 text-center max-w-7xl">
        <h2 className="mb-4 text-3xl font-bold lg:text-4xl font-playfair text-foreground">
          Trusted by Movie Lovers Worldwide
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-lg text-muted-foreground">
          Join millions of users who have made MovieMaster Pro their go-to
          platform for movie discovery and collection management.
        </p>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
          {statistics?.map((stat) => (
            <div key={stat?.title} className="text-center group">
              <div className="flex flex-col items-center justify-center p-5 mx-auto mb-4 transition-transform duration-300 bg-linear-to-r from-rose-500 to-rose-700 rounded-2xl group-hover:scale-110 cinema-shadow">
                {/* <Icon name={stat?.icon} size={28} className="text-white" /> */}
                <span className="text-6xl">{stat.icon}</span>
                <div className="my-2 text-3xl font-bold lg:text-4xl text-foreground">
                  {stat?.value}
                </div>
                <div className="mb-1 text-lg font-semibold text-foreground">
                  {stat?.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      //   <div className="grid grid-cols-1 gap-6 mx-auto my-10 mb-12 sm:grid-cols-3 max-w-7xl">
      //     {statistics.map((statistic) => (
      //       <div
      //         key={statistic.title}
      //         className="flex items-center p-6 space-x-4 bg-white border-b-4 border-red-500 shadow-lg dark:bg-linear-to-r from-rose-500 to-rose-700 rounded-xl "
      //       >
      //         <span className="text-4xl">{statistic.icon}</span>
      //         <div>
      //           <p className="text-sm ">
      //             {statistic.title}
      //           </p>
      //           <p className="text-3xl font-bold not-dark:text-gray-900 dark:text-white">
      //             {statistic.value}
      //           </p>
      //         </div>
      //       </div>
      //     ))}
      //   </div>
    );
};

export default Statistics;