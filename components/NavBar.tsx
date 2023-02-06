import {
  chakra,
  Flex,
  HStack,
  Text,
  Link,
  Button,
  Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Router, useRouter } from "next/router";

export const NavBar = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <chakra.header bg={"transparent"} w="full" px={{ base: 4, sm: 6 }} py={4}>
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex></Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <Button
              bg={"transparent"}
              pr={4}
              pl={4}
              fontWeight={"bold"}
              onClick={() => {
                router.push("/");
              }}
            >
              Home{" "}
            </Button>
            <Button
              bg={"transparent"}
              pr={4}
              pl={4}
              fontWeight={"bold"}
              onClick={() => {
                router.push("/create");
              }}
            >
              Create{" "}
            </Button>
            <Button
              bg={"transparent"}
              pr={4}
              pl={4}
              fontWeight={"bold"}
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard{" "}
            </Button>
            <Button
              bg={"transparent"}
              pr={4}
              pl={4}
              fontWeight={"bold"}
              onClick={() => {
                router.push("/mintdomain");
              }}
            >
              Mint Domain{" "}
            </Button>
            <ConnectButton showBalance={false} />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
