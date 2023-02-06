import { Text } from "@chakra-ui/layout";

export const Footer = () => {
  return (
    // Set footer in the bottom of the page
    <Text
      position="absolute"
      bottom="0"
      width="100%"
      textAlign="center"
      color="gray.500"
      fontSize="sm"
      py={4}
    >
      Made with ❤️ by{" "}
      <Text as="a" href="https://twitter.com/0xMaki" color="gray.500">
        @vrajdesai78
      </Text>
    </Text>
  );
};
