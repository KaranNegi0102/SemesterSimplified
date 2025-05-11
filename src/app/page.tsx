import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import AutoSuggestSearch from "@/components/AutoSuggestSearch";
import UniversitiesListed from "@/components/UniversitiesListed";
import mainLogo from "../app/asset/mainlogo.jpeg"
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      {/* Navigation Bar */}
      <NavBar />

      <div className="opacity-100 animate-fadeIn">
        {/* Centered Logo and Search Field */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg mt-8 text-black">
            SEMESTER SIMPLIFIED
          </h1>

          {/* Main Logo */}
          <div className="w-48 h-48 relative mb-6 ">
            <Image
              src={mainLogo}
              alt="Semester Simplified Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>

          <p className="text-2xl mb-6 font-semibold text-gray-800">
            Study Easier, Faster, and Better
          </p>

          {/* Search Bar with Icon */}
          <div className="relative w-full max-w-md">
            <AutoSuggestSearch />
          </div>
        </div>

        {/* Universities Horizontal Scroll */}
        <UniversitiesListed />
      </div>

      <div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
