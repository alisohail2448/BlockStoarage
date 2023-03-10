import React, { useState } from "react";
import { ArrowUpTrayIcon, PhotoIcon, ShareIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import axios from 'axios';
import MyModal from "./Dialog";

const UploadFile = ({account, contract, openModal, closeModal, isOpen, setModalOpen}) => {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image Selected");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(file){
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `1204c2277242b5667d3f`,
            pinata_secret_api_key: `55d04bd00038556c8d53900d48851f56e61889f3638e515fc0fd486d26226cde`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        // const signer = contract.connect(provider.getSigner());
        contract.add(account, ImgHash);
        toast.success("Successfully file Uploaded!");
        setFileName("No Image Selected");
        setFile(null);
      } catch (error) {
        toast.error("Unable to Upload image to Pinata!");
        // console.log(error)
      }
    }
  }

  const retrieveFile = (e) =>{
    const data = e.target.files[0]; 
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () =>{
      setFile(e.target.files[0]);
    }
    setFileName(e.target.files[0].name);
    e.preventDefault();
  }


  return (
    <div className="">
      <form className="flex flex-col w-full h-full" onSubmit={handleSubmit} >
        <span className="bg-[#321232d0] px-2 py-2 mb-4 text-[18px] rounded-md my-2 flex">
          Image:{" "} {fileName}
        </span>
        <label
          htmlFor="file-upload"
          className="text-center rounded-md cursor-pointer font-bold text-[18px]  py-2 hover:underline flex justify-center items-center"
        >
          <PhotoIcon className="h-5 w-5 mr-2"/> Choose Image
        </label>
        <input
            disabled={!account}
          type="file"
          id="file-upload"
          name="data"
            onChange={retrieveFile}
        />
        <button type="submit" className="btn mt-6 flex items-center justify-center font-semibold disabled:opacity-40 disabled:cursor-auto" disabled={!file}>
          <ArrowUpTrayIcon className="h-5 w-5 mr-2"/> Upload File
        </button>
      </form>
      <hr className="h-px my-4 bg-[#321232d0]" />
      <button type="submit" className="btn w-full flex items-center justify-center font-semibold" onClick={() => setModalOpen(true)}>
      <ShareIcon className="h-5 w-5 mr-2"/> Share With
      </button>
    </div>
  );
};

export default UploadFile;
