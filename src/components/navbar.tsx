import Link from "next/link";
import React from "react";

export default function NavBar () {
  const isAuthenticated = false;

  return (
    <nav className="bg-gray-900 text-gray-300 shadow-xl">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold  py-4">
          SemesterSimplified
        </h1>

        <ul className="flex flex-row items-center justify-end gap-5 text-xl py-4 px-4 w-full transition-all duration-500 ease-in-out">
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out cursor-pointer ">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out cursor-pointer ">
            <Link href="/about">About Us</Link>
          </li>
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out cursor-pointer ">
            <Link href="/support">Support Us</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link href="/profile">
                  <button className="border border-black px-2 py-1 rounded-lg transition-transform duration-300 hover:scale-110 hover:bg-gray-200">
                    Profile
                  </button>
                </Link>
              </li>
              <li>
                <button className="border border-black px-2 py-1 rounded-lg bg-red-500 text-white transition-transform duration-300 hover:scale-110 hover:bg-red-600">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <button className="border  border-white px-2 py-1 rounded-lg transition-transform duration-300 hover:scale-110 hover:bg-gray-200">
                    Log In
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <button className="border border-black px-2 py-1 rounded-lg bg-slate-800 text-white transition-transform duration-300 hover:scale-110 hover:bg-slate-700">
                    Register
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
