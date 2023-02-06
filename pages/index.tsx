import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Center,
  Text,
  Button,
  Stack,
  useColorModeValue,
  createIcon,
  Flex,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { LinkIcon, LockIcon, StarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const Feature = ({ title, text, icon }: any) => {
  return (
    <Stack>
      <Flex
        w={14}
        h={14}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bgGradient="linear(to-tl, #c888fdda, #8423f9)"
        mb={1}
      >
        <Icon as={icon} w={6} h={6} />
      </Flex>
      <Text fontWeight={700} fontSize={"2xl"} color={"#a13bf7"}>
        {title}
      </Text>
      <Text color={"gray.800"} fontWeight={500}>
        {text}
      </Text>
    </Stack>
  );
};

export default function LandingPage() {
  const router = useRouter();

  return (
    <Box
      bgGradient="radial-gradient(circle at 20% 20%, #c888fdda, rgba(76, 0, 255, 0), rgba(76, 0, 255, 0), #c888fdda, rgba(76, 0, 255, 0))"
      opacity={1}
      className="blurBg"
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <title>Poly Funds</title>
        <meta property="og:title" content="Poly Funds" key="title" />
      </Head>
      <NavBar />
      <Container maxW={"3xl"} marginBottom={9}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
            lineHeight={"110%"}
            color={"gray.700"}
          >
            Create your{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-tr, #a13bf7, purple.300)"
              bgClip="text"
              fontWeight="extrabold"
            >
              on-chain
            </Text>{" "}
            profile <br /> over{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-bl, #a13bf7, purple.300)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Polygon
            </Text>{" "}
            & get{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-bl, #a13bf7, purple.300)"
              bgClip="text"
              fontWeight="extrabold"
            >
              MATIC
            </Text>
          </Heading>
          <Text color={"gray.900"} fontSize="xl">
            Just for you! Built your on-chain profile & list the SM links to
            present your identity. VOILA! Get matic directly to your wallet by
            your audience. <br />
            Proudly made on Polygon Network!
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"#9f4be3f9"}
              size="lg"
              rounded={"full"}
              px={6}
              _hover={{
                bg: "#7928CA",
                color: "",
              }}
              onClick={() => {
                router.push("/create");
              }}
            >
              Get
            </Button>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue("gray.800", "gray.300")}
                w={71}
                position={"absolute"}
                right={-71}
                top={"10px"}
              />
              <Text
                fontSize={"xl"}
                fontFamily={"Caveat"}
                position={"absolute"}
                right={"-125px"}
                top={"-15px"}
                transform={"rotate(10deg)"}
              >
                Funds on Matic!
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Center>
        <Flex p={4} width="70%" justifyContent={"center"} mb={20}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={20}>
            <Stack>
              <Flex
                w={14}
                h={14}
                align={"center"}
                justify={"center"}
                color={"white"}
                rounded={"full"}
                bgGradient="linear(to-tl, #c888fdda, #8423f9)"
                mb={1}
              >
                <Icon as={StarIcon} w={6} h={6} />
              </Flex>
              <Text fontWeight={700} fontSize={"2xl"} color={"#a13bf7"}>
                Open Source
              </Text>
              <Text color={"gray.800"} fontWeight={500}>
                We welcome all the contributors, add your profile link with work
                and incentivize the project with a larger audience at ZERO fees.{" "}
              </Text>
            </Stack>

            <Stack>
              <Flex
                w={14}
                h={14}
                align={"center"}
                justify={"center"}
                color={"white"}
                rounded={"full"}
                bgGradient="linear(to-tl, #c888fdda, #8423f9)"
                mb={1}
              >
                <Icon as={LinkIcon} w={6} h={6} />
              </Flex>
              <Text fontWeight={700} fontSize={"2xl"} color={"#a13bf7"}>
                Total decentralised{" "}
              </Text>
              <Text color={"gray.800"} fontWeight={500}>
                Be relaxed, we got you! Hassleless transactions on L2
                Blockchain, just send your wishes instantly with few MATIC.
              </Text>
            </Stack>

            <Stack>
              <Flex
                w={14}
                h={14}
                align={"center"}
                justify={"center"}
                color={"white"}
                rounded={"full"}
                bgGradient="linear(to-tl, #c888fdda, #8423f9)"
                mb={1}
              >
                <Icon as={LockIcon} w={6} h={6} />
              </Flex>
              <Text fontWeight={700} fontSize={"2xl"} color={"#a13bf7"}>
                Secure{" "}
              </Text>
              <Text color={"gray.800"} fontWeight={500}>
                All your personal data will be on-chain stored inside a smart
                contract in a secure manner.{" "}
              </Text>
            </Stack>
          </SimpleGrid>
        </Flex>
      </Center>
    </Box>
  );
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
