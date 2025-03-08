import React, { useState } from "react";
import Nav from "../Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/UserSlice";
import { auth } from "../firebase";
import PlanScreen from "./PlanScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen text-white w-full">
      <Nav />
      <div className="relative h-[100vh] pt-[10rem] w-fit left-[30%]">
        <h1 className="text-5xl">Edit Profile</h1>
        <div className="flex ">
          <img
            className="w-20 h-20"
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            alt=""
          />
          <div className="w-120 ml-5">
            <h1 className="bg-gray-600 px-3 py-2 mb-3">{user.email}</h1>
            <p className="border-b border-gray-600 mb-3 pb-2">
              Plans (Current Plan: Premium)
            </p>
            <PlanScreen/>
            <button
              onClick={() => auth.signOut()}
              className="text-center w-full bg-[#e50914] rounded-sm py-1 font-semibold cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
