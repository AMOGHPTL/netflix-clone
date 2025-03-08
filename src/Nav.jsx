import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div
      className={`transition ease-in-out duration-200 fixed top-0 w-full z-50 ${
        show && "bg-black "
      }`}
    >
      <div className="flex justify-between items-center">
        <img
         onClick={()=>navigate("/")}
          className="object-contain w-40 h-20 pl-[20px] cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        />
        <img
          onClick={() => {
            navigate("/profile");
          }}
          className="w-15 h-15 cursor-pointer mr-[20px]"
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
        />
      </div>
    </div>
  );
}

export default Nav;
