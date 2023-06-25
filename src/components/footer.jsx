import { Box, Flex, Heading, Input, IconButton } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";

export const Footer = () => {
  return (
    <Box bgGradient="linear(to-r, blue.600, blue.400)" p="30px" boxShadow="md">
      <Flex
        color="white"
        pl="100px"
        pr="100px"
        justifyContent="center"
        alignItems="center"
        gap="20px"
      >
        <IconButton
          as="a"
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          icon={<FaFacebookF />}
          fontSize="2xl"
          bg="transparent"
          _hover={{ color: "blue.400" }}
        />
        <IconButton
          as="a"
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          icon={<FaTwitter />}
          fontSize="2xl"
          bg="transparent"
          _hover={{ color: "blue.400" }}
        />
        <IconButton
          as="a"
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          icon={<FaInstagram />}
          fontSize="2xl"
          bg="transparent"
          _hover={{ color: "blue.400" }}
        />
      </Flex>
      <Flex justifyContent="center">
        <Box mt="20px" w="1000px" h="1px" bgColor="white"></Box>
      </Flex>
      <Flex justifyContent="center" mt="5px">
        <Box>
          <Flex justifyContent="center" mb="10px">
            <Heading color="white" fontSize="xl">
              Newsletter
            </Heading>
          </Flex>
          <Flex alignItems="center">
            <Input
              placeholder="Input Your Email"
              color="white"
              _placeholder={{ color: "white" }}
              w="300px"
              borderRadius="md"
              focusBorderColor="blue.400"
              mr="2"
            />
            <IconButton
              aria-label="Subscribe"
              icon={<AiFillMail />}
              colorScheme="white"
              bg="blue.400"
              borderRadius="md"
              _hover={{ bg: "blue.500" }}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
