"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks/hooks";
import { fetchUserData, logout } from "@/app/redux/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: any) => state.auth);

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
      <div className="flex items-center justify-between px-4">
        <h1 className="text-xl font-bold py-3">SemesterSimplified</h1>

        <ul className="flex flex-row items-center justify-end gap-4 py-3 px-4 w-full transition-all duration-500 ease-in-out text-md">
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out cursor-pointer">
            <Link href="/about">About Us</Link>
          </li>
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out cursor-pointer">
            <Link href="/support">Support Us</Link>
          </li>

          {isLoggedIn ? (
            <>
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
    </nav>
  );
}
