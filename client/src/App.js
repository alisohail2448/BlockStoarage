import "./App.css";
import Home from "./Components/Home";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast, Toaster } from 'react-hot-toast'
import Display from "./Components/Display";
import Topbar from "./Components/Topbar";import MyModal from "./Components/Dialog";
import Modal from "./Components/Modal";
;

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
   <>
    {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
     <div className="App">
      <Toaster position="top-center" reverseOrder={false}   toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#321232d0',
      color: '#fff',
    }}} />
      <Topbar/>
      <Home account={account} contract={contract} provider={provider}  openModal={openModal} closeModal={closeModal} isOpen={isOpen} setModalOpen={setModalOpen} />
      <Display account={account} contract={contract} provider={provider} />
      {/* <MyModal openModal={openModal} closeModal={closeModal} isOpen={isOpen} contract={contract}  /> */}
    </div>
   </>
  );
}

export default App;
