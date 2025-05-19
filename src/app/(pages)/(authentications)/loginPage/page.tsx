import LoginForm from "./loginForm";
import NavBar from "@/components/navbar";

export default function LoginPage() {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </div>
    
  );
}
