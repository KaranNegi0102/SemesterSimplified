"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks/hooks";
import { fetchUserData, logout } from "@/app/redux/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  async function handleLogoutButton() {
    try {
      const response = await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log("User logged out successfully.");
        dispatch(logout());
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className="bg-gray-900 text-gray-300 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-sm sm:text-xl font-bold">SemesterSimplified</h1>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                    <Link href="/aboutUs">About Us</Link>
                  </li>
                  <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                    <Link href="/dashboardPage">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/profile">
                      <button className="border bg-white text-black px-2 py-0.5 rounded-lg transition-transform duration-300 hover:scale-110 hover:bg-gray-200 hover:text-black text-sm">
                        Profile
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogoutButton}
                      className="border border-black px-2 py-0.5 rounded-lg bg-red-500 text-white transition-transform duration-300 hover:scale-110 hover:bg-red-600 text-sm"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">
                    <Link href="/aboutUs">About Us</Link>
                  </li>
                  <li>
                    <Link href="/loginPage">
                      <button className="border border-white px-2 py-0.5 rounded-lg transition-transform duration-300 hover:scale-110 hover:bg-gray-200 text-sm">
                        Log In
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/registerPage">
                      <button className="border border-black px-2 py-0.5 rounded-lg bg-slate-800 text-white transition-transform duration-300 hover:scale-110 hover:bg-slate-700 text-sm">
                        Register
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-xs font-medium hover:text-blue-500 hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                href="/aboutUs"
                className="block px-3 py-2 rounded-md text-xs font-medium hover:text-blue-500 hover:bg-gray-700"
              >
                About Us
              </Link>
              <Link
                href="/dashboardPage"
                className="block px-3 py-2 rounded-md text-xs font-medium hover:text-blue-500 hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-xs font-medium hover:text-blue-500 hover:bg-gray-700"
              >
                Profile
              </Link>
              <button
                onClick={handleLogoutButton}
                className="w-full text-left px-3 py-2 rounded-md text-xs  font-medium text-red-500 hover:bg-gray-700"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-xs font-medium hover:text-blue-500 hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                href="/aboutUs"
                className="block px-3 py-2 rounded-md text-xs font-medium hover:text-blue-500 hover:bg-gray-700"
              >
                About Us
              </Link>
              <Link
                href="/loginPage"
                className="block px-3 py-2 rounded-md text-xs font-medium hover:text-blue-500 hover:bg-gray-700"
              >
                Log In
              </Link>
              <Link
                href="/registerPage"
                className="block px-3 py-2 rounded-md text-xs font-medium hover:text-blue-500 hover:bg-gray-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
