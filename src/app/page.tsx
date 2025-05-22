"use client";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import AutoSuggestSearch from "@/components/AutoSuggestSearch";
import UniversitiesListed from "@/components/UniversitiesListed";
import mainLogo from "../../public/mainLogo.jpeg";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  console.log(selectedCourse, selectedSubject);

  function handleSelectionChange(course: string, subject: string) {
    setSelectedCourse(course);
    setSelectedSubject(subject);

    // Navigate to dashboard when a subject is selected
    if (course && subject) {
      router.push(
        `/dashboardPage?course=${encodeURIComponent(
          course
        )}&subject=${encodeURIComponent(subject)}`
      );
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      {/* Navigation Bar */}
      <NavBar />

      <div className="opacity-100 animate-fadeIn">
        {/* Centered Logo and Search Field */}
        <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12">
          <h1 className="text-1xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg mt-4 sm:mt-8 text-black">
            SEMESTER SIMPLIFIED
          </h1>

          {/* Main Logo */}
          <div className="w-22 h-22 sm:w-38 sm:h-38 relative mb-4 sm:mb-6">
            <Image
              src={mainLogo}
              alt="Semester Simplified Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>

          <p className="text-xs sm:text-xl mb-2 sm:mb-3 font-semibold text-gray-800">
            Study Easier, Faster, and Better
          </p>

          {/* Search Bar with Icon */}
          <div className="relative w-full max-w-[280px] sm:max-w-md mx-auto">
            <AutoSuggestSearch onSelectionChange={handleSelectionChange} />
          </div>
        </div>

        {/* Universities Horizontal Scroll */}
        <div className="w-full overflow-x-auto">
          <UniversitiesListed />
        </div>
      </div>

      <div className="mt-auto">
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
