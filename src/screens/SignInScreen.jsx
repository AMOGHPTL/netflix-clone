import React, { useRef } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signin__screen flex flex-col justify-center items-center cursor-default">
      <form className="flex flex-col items-start p-15 px-20 bg-[rgba(0,0,0,0.8)] rounded-md">
        <h1 className="mb-5 text-5xl font-bold">Sign In</h1>
        <input
          ref={emailRef}
          className=" bg-white text-xs font-semibold text-black placeholder-gray-500 p-4  my-2 w-75 rounded-md outline-none"
          type="email"
          placeholder="Email"
        />
        <input
          ref={passwordRef}
          className="bg-white text-xs font-semibold text-black placeholder-gray-500 p-4 my-2 w-75 rounded-md outline-none"
          type="password"
          placeholder="password"
        />
        <button
          className="bg-[#e50914] w-full rounded-md p-2.5 font-bold my-5 cursor-pointer"
          type="submit"
          onClick={signIn}
        >
          {" "}
          Sign In
        </button>
        <p>
          <span className="text-gray-400">New to Netflix? </span>
          <span
            className="hover:cursor-pointer hover:underline"
            onClick={register}
          >
            Sign up now
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignInScreen;
