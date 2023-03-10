import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import UploadFile from "./UploadFile";

const Card = ({account, contract, provider, openModal, closeModal, isOpen, setModalOpen}) => {
  return (
    <div className="w-[50%] flex justify-center">
      <div className={!account ? 'card w-[400px]': 'card px-8 '}>
        <div className="z-10 text-white">
          <h2 className="text-xl flex items-center justify-center mb-4">
            <UserCircleIcon className="h-6 w-6 mr-1" />
            Connected Account
          </h2>
          <div className="bg-[#321232d0] px-2 py-2 text-[18px] rounded-md my-2 flex justify-center items-center">
            {account ? account : "Account is not connected yet!"}
          </div>
            <UploadFile account={account} contract={contract} provider={provider}  openModal={openModal} closeModal={closeModal} isOpen={isOpen} setModalOpen={setModalOpen} />
        </div>
      </div>
    </div>
  );
};

export default Card;
