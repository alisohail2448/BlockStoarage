import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import Card from "./Card";

const Home = ({ account, contract, provider, openModal, closeModal, isOpen, setModalOpen }) => {
  return (
    <>
      <div className="h-full flex items-center w-full">
        <section className="header">
          <div className="title-wrapper">
            <h1 className="sweet-title">
              <span data-text="Block">Block</span>
              <span data-text="Storage">Storage</span>
            </h1>
            <span className="top-title">Welcome to</span>
            <span className="bottom-title">Decentralized File System</span>
          </div>
        </section>
        <Card account={account} contract={contract} provider={provider}  openModal={openModal} closeModal={closeModal} isOpen={isOpen} setModalOpen={setModalOpen} />
      </div>
      <div className="text-white flex justify-center items-center flex-col pb-4">
        <p className="text-[18px]">Your uploaded file will be shown below. Plz scroll Down</p>
        <ChevronDoubleDownIcon className="h-6 w-6"/>
      </div>
    </>
  );
};

export default Home;
