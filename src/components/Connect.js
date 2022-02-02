import React from "react";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";

const Connect = () => {
  const [accounts, setAccounts] = useState([]);
  const [btnAddress, setBtnAddress] = useState("Connect");
  const [isConnected, setIsConnected] = useState(false);
  const [accBalance, setAccBalance] = useState();

  async function connectToMetamask() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if ((await provider.getNetwork()).chainId !== 4002) {
        swal("PLEASE SWITCH FANTOM TESTNET");
        return;
      }

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const addressOfAccount = await signer.getAddress();
      const balanceOfAddress = await provider.getBalance(addressOfAccount);
      const balanceOfAddressLast =
        parseInt(balanceOfAddress._hex.toString(16), 16) / 10 ** 18;
      setIsConnected(true);
      setBtnAddress(addressOfAccount);

      console.log(parseInt(balanceOfAddress._hex.toString(16), 16) / 10 ** 18);
      setAccBalance(balanceOfAddressLast);
    } else {
      swal("Please install Metamask");
    }
  }
  return (
    <div>
      <Button onClick={connectToMetamask} variant="contained">
        {isConnected ? (
          <Typography>
            {btnAddress.slice(0, 8) + "...  "}[{accBalance} FTM]
          </Typography>
        ) : (
          "Connect"
        )}
      </Button>
    </div>
  );
};

export default Connect;
