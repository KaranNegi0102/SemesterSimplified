import LoginForm from "./loginForm";
import NavBar from "@/components/navbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8 md:py-12 px-3 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
