import React from "react";
import { universityList } from "../app/asset/universityList";
import Image from "next/image";

export default function UniversitiesListed() {
  return (
    <div className="relative w-full overflow-hidden bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="flex animate-scroll">
        {/* First set of universities */}
        {universityList.map((university, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 transform transition-transform duration-300 hover:scale-105 sm:hover:scale-110"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white shadow-lg overflow-hidden">
              {university.logoUrl && (
                <div className="w-full h-full relative">
                  <Image
                    src={university.logoUrl}
                    alt={`${university.name} logo`}
                    fill
                    className="object-cover p-2 sm:p-3 md:p-4"
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {universityList.map((university, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 transform transition-transform duration-300 hover:scale-105 sm:hover:scale-110"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white shadow-lg overflow-hidden">
              {university.logoUrl && (
                <div className="w-full h-full relative">
                  <Image
                    src={university.logoUrl}
                    alt={`${university.name} logo`}
                    fill
                    className="object-cover p-2 sm:p-3 md:p-4"
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
