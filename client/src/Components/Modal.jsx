import { useEffect } from "react";
import { toast } from "react-hot-toast";
import "./Modal.css";
const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".modalAddress").value;
    await contract.allow(address);
    setModalOpen(false);
    toast.success("Shared Successfully!");
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="modalBackground z-50 ">
        <div className="modalContainer">
          <div className="title text-xl font-medium leading-6 text-white mb-4 mt-2">Share With</div>
          <div className="">
            <input
              type="text"
              className="modalAddress block w-full py-3 pl-4 bg-[#833183d0] text-[#ffd4ffd0] text-md rounded-lg focus:ring-[#f0a2f0d0] focus:border-[#f0a2f0d0]"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber" className="bg-[#833183d0] w-full py-3 pl-4 text-[#ffd4ffd0] text-md rounded-lg focus:ring-[#f0a2f0d0] focus:border-[#f0a2f0d0] mt-4">
              <option className="modalAddress">People With Access</option>
            </select>
          </form>
          <div className="flex justify-between mt-10">
            <button className="btn w-[40%] flex justify-center items-center"
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button className="btn w-[40%] flex justify-center items-center" onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;