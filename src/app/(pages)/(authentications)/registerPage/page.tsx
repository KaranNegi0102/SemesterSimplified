import RegisterForm from "./registerForm";
import NavBar from "@/components/navbar";
export default function RegisterPage() {
  

  return (
    <div>
      <NavBar/>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm/>
      </div>

    </div>
    
  );
}
