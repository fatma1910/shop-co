import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }:{children: React.ReactNode}) => {
    return (
        <div >
          <div className="flex flex-col xl:flex-row items-center  xl:gap-[129px] ">
            <Image src={'/signIn.jpg'} alt="sign in"
            width={805} height={781} className="" />
            {children}
          </div>
      </div>
    )
    
};

export default AuthLayout