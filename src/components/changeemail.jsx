import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  InputRightElement,
  InputGroup
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { Navbar } from "./navbar";

export default function ChangeEmailForm() {
  const data = useSelector((state) => state.user.value);
  const toast = useToast(); // Inisialisasi useToast hook

  console.log(data);
  console.log(data.email);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const resetSchema = Yup.object().shape({
    currentEmail: Yup.string()
      .required("Current email is required")
      .oneOf([data.email], "Current email does not match"),

    newEmail: Yup.string()
      .required("New email is required")
      .email("Invalid email address format"),
  });

  const handleSubmit = async (data) => {
    try {
      data.FE_URL = window.location.origin;
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
        data,
        { headers }
      );

      console.log(response);
      localStorage.removeItem("token");
      navigate("/");
      toast({
        title: "Email changed",
        description: "Your email has been successfully changed.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "An error occurred while changing email.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        currentEmail: "",
        newEmail: "",
      }}
      validationSchema={resetSchema}
      onSubmit={(value, action) => {
        handleSubmit(value);
      }}
    >
      {(props) => {
        return (
          <Form>
            <Flex
              minH={"100vh"}
              align={"center"}
              justify={"center"}
              bgGradient={"linear(to-r, blue.600, blue.400, blue.200)"}
            >
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={"white"}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                  Change your email
                </Heading>
                <Field name="currentEmail">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="currentEmail">Current email</FormLabel>
                      <Input {...field} type="text" id="currentEmail" />
                    </FormControl>
                  )}
                </Field>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="currentEmail"
                  component="div"
                />
                <Field name="newEmail">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="newEmail">New email</FormLabel>
                      <Input {...field} type="text" id="newEmail" />
                    </FormControl>
                  )}
                </Field>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="newEmail"
                  component="div"
                />

                <Stack spacing={6}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    isDisabled={!props.dirty}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
}
