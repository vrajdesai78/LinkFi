// Import grid from chakra ui
import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Link,
  Flex,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import abi from "../utils/contractABI.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";
import { NavBar } from "../components/NavBar";
import { useAccount } from "wagmi";
import { contractAddress } from "../utils/contract";

interface profileDetails {
  name: string;
  bio: string;
  profileImage: string;
  email: string;
  linkedinUrl: string;
  twitterUrl: string;
  githubUrl: string;
}

export const socialLinkComponent = (
  url: string,
  text: string,
  icon: IconType
) => {
  return (
    <HStack spacing={2}>
      <Box minW="xl">
        <Link
          href={url}
          isExternal
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button
            minW={"50%"}
            flex={1}
            fontSize={"md"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            <Icon as={icon} size={"md"} />
            <Text
              fontSize={"md"}
              textAlign={"center"}
              color={"gray.700"}
              px={3}
            >
              {text}
            </Text>
          </Button>
        </Link>
      </Box>
    </HStack>
  );
};

const App = () => {
  const [walletAddress, setAddress] = useState("");
  const [record, setRecord] = useState("");
  const [profile, setProfile] = useState({} as profileDetails);
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const toast = useToast();
  const [message, setMessage] = useState("");

  const router = useRouter();

  // Check if router is ready in useEffect
  useEffect(() => {
    if (router.isReady) {
      const { ens } = router.query;
      if (ens) {
        getAddress(ens.toString());
      }
    }
  }, [router.isReady]);

  const contractAbi = abi.abi;

  const getAddress = async (ens: string) => {
    const ensProvider = new ethers.providers.JsonRpcProvider(
      "https://api.hyperspace.node.glif.io/rpc/v1"
    );

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

        await contract
          .getAddress(ens?.toString().split(".")[0])
          .then(async (domainAddress: string) => {
            if (domainAddress) {
              console.log(domainAddress);
              setAddress(domainAddress);
              await contract
                .getRecord(domainAddress)
                .then(async (record: string) => {
                  console.log("Record", record)
                  setRecord(record);
                  const link = `https://${record}.ipfs.w3s.link/${domainAddress}.json`;
                  const response = await fetch(link);
                  const data: profileDetails = await response.json();
                  console.log(response)
                  setProfile(data as profileDetails);
                });
            } else {
              return {
                notFound: true,
              };
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

    const sendTransaction = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as any
          );
          const signer = provider.getSigner();

          const tx = {
            from: address,
            to: walletAddress,
            value: ethers.utils.parseEther(amount),
            nonce: provider.getTransactionCount(address!, "latest"),
            gasLimit: ethers.utils.hexlify(100000),
            gasPrice: provider.getGasPrice(),
          };

          signer.sendTransaction(tx).then(async (transaction) => {
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

              const addtx = await contract.setTransaction(
                walletAddress,
                address,
                amount,
                message
              );

              addtx.wait().then(() => {
                toast({
                  title: "Matic Sent",
                  description: "You successfully sent matic",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              });
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Box
        bgGradient="radial-gradient(circle at 20% 20%, #c888fdda, rgba(76, 0, 255, 0), rgba(76, 0, 255, 0), #c888fdda, rgba(76, 0, 255, 0))"
        opacity={1}
        className="blurBg"
      >
        <NavBar />
        <Box
          style={{
            margin: 0,
            padding: 0,
            height: "calc(100vh-72px)",
            width: "100vw",
            overflow: "hidden",
          }}
        >
          <style jsx global>{`
            html,
            body {
              height: 100%;
              width: 100%;
              overflow-x: hidden;
              margin: 0;
              padding: 0;
            }
          `}</style>
          <Flex
            py={6}
            minW={"100vw"}
            maxH={"100vh"}
            p={30}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              maxW={"sm"}
              w={"full"}
              border="1px"
              bgGradient={"linear(blue.200 0%, purple.200 35%, green.100 100%)"}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={6}
              textAlign={"center"}
            >
              <Avatar
                border={"2px"}
                size={"2xl"}
                src={profile.profileImage}
                mb={4}
                pos={"relative"}
              />
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {profile.name}
              </Heading>
              <Text
                textAlign={"center"}
                color={"black.900"}
                fontWeight="bold"
                px={3}
              >
                {profile.bio}
              </Text>

              {/* {Show social media links of user} */}

              <VStack mt={8} direction={"row"} spacing={4}>
                {socialLinkComponent(
                  `mailto:${profile.email}`,
                  "Email",
                  MdEmail
                )}
                {socialLinkComponent(
                  `https://${profile.linkedinUrl}`,
                  "LinkedIn",
                  FaLinkedin
                )}
                {socialLinkComponent(
                  `https://${profile.twitterUrl}`,
                  "Twitter",
                  FaTwitter
                )}
                {socialLinkComponent(
                  `https://${profile.githubUrl}`,
                  "Github",
                  FaGithub
                )}
              </VStack>
              <Textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(e.target.value)
                }
                placeholder="Enter Message"
                borderColor={"gray.800"}
                mt={1}
                rows={3}
                shadow="sm"
                marginTop={4}
                value={message}
                bg={"gray.100"}
              />
              <Stack mt={4} direction={"row"} spacing={2}>
                <NumberInput width={"100%"} border={1}>
                  <NumberInputField
                    placeholder="Enter Matic"
                    flex={2}
                    bg={"gray.100"}
                    fontSize={"sm"}
                    rounded={"md"}
                    width={"full"}
                    id="amount"
                    onChange={(e) => setAmount(e.target.value)}
                    _focus={{
                      bg: "gray.100",
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"md"}
                  bg={"blue.700"}
                  size={"2xl"}
                  p={2}
                  color={"white"}
                  onClick={sendTransaction}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.900",
                  }}
                  _focus={{
                    bg: "blue.900",
                  }}
                >
                  Send Matic
                </Button>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  };

export default App;
