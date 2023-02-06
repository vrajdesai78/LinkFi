import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  Grid,
} from "@chakra-ui/react";
import React from "react";

interface historyDetails {
  from: string;
  txn: string;
  matic: string;
  message: string;
  timestamp: number;
}

export default function HistoryCard({
  history,
}: {
  history: historyDetails[];
}) {
  return (
    <>
      {history.map((item, index) => (
        <Stack divider={<StackDivider />} spacing="2">
          <Box>
            <Flex alignItems={"center"}>
              <Box>
                <Text fontSize={"md"}>Address: {item.from}</Text>
              </Box>
            </Flex>
            <Box justifyContent={"end"} alignContent={"end"}>
              Matic {item.matic}
            </Box>
            <Text pt="2" fontSize="md" fontWeight={"bold"}>
              {item.message}
            </Text>
          </Box>
          <br></br>
        </Stack>
      ))}
    </>
  );
}
