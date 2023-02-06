import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HistoryCard from "../components/HistoryCard";
import abi from "../utils/contractABI.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { NavBar } from "../components/NavBar";
import { contractAddress } from "../utils/contract";

interface historyDetails {
  from: string;
  txn: string;
  matic: string;
  message: string;
  timestamp: number;
}

export default function history() {
  const [history, setHistory] = useState<historyDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { address, isConnected } = useAccount();

  const contractAbi = abi.abi;

  const getHistory = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        const history = await contract.getTransactions(address);
        setHistory(history as historyDetails[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getHistory();
    } else {
      alert("Please connect your wallet");
    }
  }, [isConnected]);

  return (
    <Box
      bgGradient="radial-gradient(circle at 20% 20%, #c888fdda, rgba(76, 0, 255, 0), rgba(76, 0, 255, 0), #c888fdda, rgba(76, 0, 255, 0))"
      opacity={1}
      className="blurBg"
    >
      <NavBar />
      <Center>
        <Heading size="2xl" color="black">
          Transactions
        </Heading>
      </Center>
      <Center h="100vh">
        <Container maxW={"container.md"} bg="#fefefe60">
          <Card>
            <CardHeader>
              <Heading size="md">Transactions</Heading>
            </CardHeader>

            <CardBody>
              {history.length > 0 && isConnected && (
                <HistoryCard history={history} />
              )}
            </CardBody>
          </Card>
        </Container>
      </Center>
    </Box>
  );
}
