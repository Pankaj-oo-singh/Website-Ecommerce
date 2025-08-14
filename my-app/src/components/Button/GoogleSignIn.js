

import React, { useCallback } from 'react';
import { BASE_URL } from '../../Api/Constant';
 // You can switch to this if needed
import fwjk from "../../Assest/imag/goo.png"

const GoogleSignIn = () => {
  const handleClick = useCallback(() => {
    window.location.href = BASE_URL + "/oauth2/authorization/google";
  }, []);

  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center border w-full rounded border-gray-600 h-[48px] hover:bg-slate-50"
    >
      <img
        
        src={fwjk}
        alt="google-icon"
        className="h-6 w-6" // Increased size
      />
      <p className="px-2 text-gray-700 font-semibold">Continue with Google</p> {/* Bolder and darker text */}
    </button>
  );
};

export default GoogleSignIn;
