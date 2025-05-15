import AutoSuggestSearch from "@/components/AutoSuggestSearch";
import NavBar from "@/components/navbar";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      <NavBar />

      {/* this div contains auto suggestion part */}
      <div className=" items-start flex justify-between gap-4 p-4">
        <AutoSuggestSearch />
        <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 mt-8 px-[10%] rounded-lg transition-colors duration-200">
          Upload Notes
        </button>
      </div>

      {/* in this div there is one big and inside that big div there are two more divs in collumn way  */}
      <div className="flex flex-row w-full p-4 gap-6">
        {/* First column div */}
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Notes</h2>
          <div className="space-y-4">
            {/* Add your content for the first column here */}
          </div>
        </div>

        {/* Second column div */}
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Popular Notes</h2>
          <div className="space-y-4">
            {/* Add your content for the second column here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
