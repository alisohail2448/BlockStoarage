import { Dialog, Transition } from "@headlessui/react";
import { ShareIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ListBox from "./ListBox";

const MyModal = ({ openModal, closeModal, isOpen, contract }) => {
  const [message, setMessage] = useState('');  
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const sharing = async () => {
    // const OtherAddress = document.querySelector(".address").value;
    await contract.allow(message);
    toast.success("Shared Successfully!");
    closeModal();
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      console.log(select)
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
        // console.log(opt)
      }
    };
    contract && accessList();
  }, [contract]);
  
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-[300px] max-w-md transform overflow-hidden rounded-2xl bg-[#321232] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white mt-4"
                  >
                    Share With
                  </Dialog.Title>
                  {/* <div className="mt-4">
                    <input
                      type="text"
                      className="address block w-full py-3 pl-4 bg-[#833183d0] text-[#ffd4ffd0] text-md rounded-lg focus:ring-[#f0a2f0d0] focus:border-[#f0a2f0d0]"
                      placeholder="Enter Address"
                      onChange={handleChange}
                    />
                  </div>
                  <form id="myForm">
                    <select
                      id="selectNumber"
                      className="bg-[#833183d0] w-full py-3 pl-4 text-[#ffd4ffd0] text-md rounded-lg focus:ring-[#f0a2f0d0] focus:border-[#f0a2f0d0] mt-4"
                    >
                      <option className="selectAddress bg-[#833183d0]">
                        People With Access
                      </option>
                    </select>
                  </form>

                  <div className="flex justify-between mt-6">
                    <button
                      className="btn w-[40%] flex justify-center items-center "
                      onClick={closeModal}
                    >
                      <XCircleIcon className="h-5 w-5 mr-2" /> Cancel
                    </button>
                    <button
                      className="btn w-[40%] flex justify-center items-center"
                      onClick={sharing}
                    >
                      <ShareIcon className="h-5 w-5 mr-2" /> Share
                    </button>
                  </div> */}

<div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={closeModal}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MyModal;
