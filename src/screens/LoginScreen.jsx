import React, { useState } from "react";
import SignInScreen from "./SignInScreen";

function LoginScreen() {
  const [signIn,setSignIn] = useState(false);



  return (
    <div
      className="loginScreen bg-transparent relative h-full"
      style={{
        background: `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs") center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div className="loginScreen__background ">
        <img
          className="object-contain fixed left-1 w-40 h-20 pl-[20px] cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        />
        <button onClick={()=>setSignIn(true)} className="px-5 h-10 fixed right-1 top-4 bg-[#e50914] font-semibold text-white mr-[20px] cursor-pointer">
          Login
        </button>
        <div
          className="loginScreen__gradient w-full h-[100vh] z-50 bg-[rgba(0,0,0,0.4)]"
          style={{
            backgroundImage:
              "linear-gradient(to top,rgba(0,0,0,0.8)0,rgba(0,0,0,0)60%,rgba(0,0,0,0.8)100%)",
          }}
        />
      </div>
      <div className="loginScreen__body absolute top-[30%] w-full mr-auto ml-auto text-center z-50 text-white">
        {signIn? 
        (<SignInScreen/>):
        (<>
          <h1 className="text-[2.8rem] font-bold">
          Unlimited films, TV programmes and more.
        </h1>
        <h3 className="text-2xl font-semibold mt-2">
          Watch anywhere. Cancel at any time
        </h3>
        <p className="mt-5 font-semibold">
          Ready to watch? Enter your to create or restart you membership.
        </p>
        <div className="liginScreen__input flex h-10 justify-center items-center mt-2">
          <input
            type="email"
            className="bg-white w-100 text-black h-full px-3 text-xs placeholder:text-gray-500 rounded-l-sm outline-none"
            placeholder="Email address"
          />
          <button onClick={()=>setSignIn(true)} className="bg-[#e50914] h-full px-3 text-sm font-semibold rounded-r-sm cursor-pointer">
            GET STARTED
          </button>
        </div>
        </>)}
      </div>
    </div>
  );
}

export default LoginScreen;
