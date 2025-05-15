// "use client"
// import React,{useState} from 'react'
// import LoginForm from '../loginPage/loginForm'
// import RegisterForm from '../registerPage/registerForm'

// export default function Page () {

//   const [currentForm , setCurrentForm] = useState('loginForm')

//   const renderForm = () =>{
//     switch(currentForm){
//       case 'loginForm':
//         return <LoginForm setCurrentForm={setCurrentForm}/>
//         case'registerForm':
//         return <RegisterForm setCurrentForm={setCurrentForm} />
//         default:
//           return <h1>Invalid Form</h1>

//     }
//   }

//   return (
//     <div className="min-h-screen  flex justify-center items-center  bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       {renderForm ()}
//     </div>
//   )
// }


