import React, { useEffect, useState } from "react";

const Topbar = () => {
    const [cross, setCross] = useState(false);
    useEffect(() => {
        setCross(false);
    }, [])
    
  return (
    <nav class={cross ? 'hidden' : 'bg-[#321232] border-gray-200 px-2 sm:px-4 py-1.5 flex justify-center items-center transition-all'} >
      <p className="text-[#fdc9fd] text-[18px] text-center ">
        A blockchain-based file sharing and storage system for secure data
        management.🔥
      </p>
      <p className="text-[#fdc9fd] absolute right-4 cursor-pointer" onClick={() => setCross(true)}>
        X
      </p>
    </nav>
  );
};

export default Topbar;
