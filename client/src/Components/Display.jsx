import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Display = ({ account, contract, provider }) => {
  const [data, setData] = useState("");
  const getData = async (e) => {
    e.preventDefault();
    let dataArray;
    const OtherAddress = document.querySelector(".address").value;
    // console.log(OtherAddress)
    try {
      if (OtherAddress) {
        dataArray = await contract.display(OtherAddress);
        // console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
        // console.log(dataArray)
      }
    } catch (e) {
      toast.error("You don't have access");
      console.log(e);
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);

      const images = str_array.map((item, i) => {
        return (
          <a href={`https://gateway.pinata.cloud/ipfs/${item.substring(7)}`} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(7)}`}
              alt="new"
              className=""
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      toast.error("No Image to display!");
    }
  };
  return (
    <div className="w-full h-[100vh] flex items-center mt-20 flex-col">
      <h2 className="text-white text-2xl font-bold ">Display Files</h2>
      <div className="mt-20 w-[50%]">
        <form>
          <label
            for="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Enter Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="address block w-full p-4 pl-10 bg-[#321232d0] text-[#f0a2f0d0] text-md rounded-lg focus:ring-[#f0a2f0d0] focus:border-[#f0a2f0d0]"
              placeholder="Enter Address"
            />
            <button
              type="submit"
              onClick={getData}
              className="text-white absolute right-2.5 bottom-2.5 bg-[#e87722] hover:bg-[#9f5014] focus:ring-4 focus:outline-none focus:bg-[#e87722] font-medium rounded-lg text-sm px-4 py-2"
            >
              Get Data
            </button>
          </div>
        </form>
      </div>
   {
    data && (
      <section>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div class="p-4 md:w-1/2">
            <div class="h-full bg-[#321232d0] p-4 rounded-lg overflow-hidden border-none flex justify-center items-center">
              {data}
            </div>
          </div>
        </div>
      </div>
    </section>
    )
   }
    </div>
  );
};

export default Display;
