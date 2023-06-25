import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getVerified = async () => {
    try {
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",
        {},
        { headers }
      );

      console.log(response);
      navigate("/login");

      // Tampilkan pesan toast
      toast({
        title: "Verification Successful",
        description: "Your account has been successfully verified.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);

      // Tampilkan pesan toast
      toast({
        title: "Verification Failed",
        description: "Failed to verify your account.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      bgGradient={"linear(to-r, blue.600, blue.400, blue.200)"}
      h={"100vh"}
    >
      <Box mt={"400px"}>
        <Heading color={"white"}>Verify your account</Heading>
        <Flex justifyContent={"center"} mt={"40px"}>
          <Formik>
            <Button
              fontSize={"25px"}
              _hover={{ transform: "scale(1.2)", transition: "0.3s" }}
              bgColor={"white"}
              color={"blue.400"}
              w={"200px"}
              h={"50px"}
              type="button"
              onClick={getVerified}
            >
              <Text bgClip={"text"} bgGradient={"linear(to-r , blue.200 , blue.600)"}>
                Verify
              </Text>{" "}
            </Button>
          </Formik>
        </Flex>
      </Box>
    </Flex>
  );
}
