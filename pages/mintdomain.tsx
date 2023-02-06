/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { NavBar } from "../components/NavBar";
import { ethers, utils } from "ethers";
import {
  chakra,
  Box,
  Flex,
  Input,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";
import abi from "../utils/contractABI.json";
import { contractAddress } from "../utils/contract";

const App = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const [domain, setDomain] = useState("");

  const contractAbi = abi.abi;
  const doNothing = async () => {};

  const mintDomain = async () => {
    if (!isConnected) {
      alert("Please connect your wallet");
      return;
    }

    if (!domain) {
      alert("Please enter a domain");
      return;
    }

    const price =
      domain.length === 3 ? "0.05" : domain.length === 4 ? "0.02" : "0.01";

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

        let txn = await contract.register(domain, {
          value: utils.parseEther(price),
        });
        txn.wait().then(() => {
          console.log(txn.hash);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      bgGradient="radial-gradient(circle at 20% 20%, #4287f5, rgba(76, 0, 255, 0), rgba(76, 0, 255, 0), #83b0f7, rgba(76, 0, 255, 0))"
      opacity={1}
      className="blurBg"
    >
      {" "}
      <NavBar />
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={0} padding={1}>
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="center"
          px={{ base: 2, lg: 10 }}
          py={24}
        >
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="black"
            lineHeight="shorter"
          >
            What is domain?
          </chakra.h1>
          <chakra.form w="full" mb={6}></chakra.form>
          <chakra.p
            pr={{ base: 0, lg: 16 }}
            mb={6}
            fontSize="xl"
            color="black"
            _dark={{ color: "gray.400" }}
            letterSpacing="wider"
          >
            FNS (Filecoin Name Service) is a decentralized, open-source system
            that allows users to register, update, and manage human-readable
            names (e.g ENS) on the Filecoin Network. These names can be used as unique
            identifiers for smart contracts, cryptocurrency addresses, and other
            resources on the Filecoin network.
          </chakra.p>
        </Flex>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} padding={5}>
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="center"
          px={{ base: 2, lg: 10 }}
          py={20}
        >
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="black"
            lineHeight="shorter"
          >
            Get your own .FIL domain.
          </chakra.h1>
          <chakra.form w="full" mb={6}>
            <InputGroup
              size="lg"
              w="full"
              display={{ base: "none", lg: "flex" }}
            >
              <Input
                size="lg"
                color="black"
                type="email"
                placeholder="Enter your .FIL User Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDomain(e.target.value)
                }
              />
              <InputRightElement w="auto">
                <Button
                  color="black"
                  variant="solid"
                  colorScheme="brand"
                  size="lg"
                  onClick={mintDomain}
                  roundedLeft={0}
                >
                  Mint Now
                </Button>
              </InputRightElement>
            </InputGroup>
          </chakra.form>
          <chakra.p
            pr={{ base: 0, lg: 16 }}
            mb={4}
            fontSize="xl"
            color="black"
            _dark={{ color: "gray.400" }}
            letterSpacing="wider"
          >
            Decentralised naming for wallets, websites, & more.
          </chakra.p>
        </Flex>
        <Box ml={30}>
          <Image
            src="https://bafkreic3h2hx4bh6krn2oo36bms5rlyfqrn3kq32wuf36p446e7zj5jmpq.ipfs.nftstorage.link"
            fit="cover"
            w="60%"
            h="full"
            loading="lazy"
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default App;
