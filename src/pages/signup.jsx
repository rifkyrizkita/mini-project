import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
export function Signup() {
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate()
  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .min(10, "Phone number too short")
      .max(12, "Phone number too long")
      .matches(/^\d+$/, "Phone number must contain only digits"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Passwword too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
    confirmPassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = async (data) => {
    try {
      data.FE_URL= window.location.origin
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        data
      );
      console.log(response.data);
      navigate("/")
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(value, action) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(props) => {
          return (
            <Flex
              minH={"100vh"}
              align={"center"}
              justify={"center"}
              bg={"gray.50"}
            >
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                    Sign up
                  </Heading>
                </Stack>
                <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                  <Stack spacing={4}>
                    <Form>
                      <Field name="username">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input {...field} type="text" id="username" />
                          </FormControl>
                        )}
                      </Field>
                                 <ErrorMessage
                        style={{ color: "red" }}
                        name="username"
                        component="div"
                      />

                      <Field name="email">
                        {({ field }) => (
                          // https://chakra-ui.com/getting-started/with-formik
                          <FormControl>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input {...field} type="email" id="email" />
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="email"
                        component="div"
                      />

                      <Field name="phone">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor="phone">Phone number</FormLabel>
                            <Input {...field} type="text" id="phone" />
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="phone"
                        component="div"
                      />

                      <Field name="password">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <InputGroup>
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                id="password"
                              />
                              <InputRightElement h={"full"}>
                                <Button
                                  variant={"ghost"}
                                  onClick={() =>
                                    setShowPassword(
                                      (showPassword) => !showPassword
                                    )
                                  }
                                >
                                  {showPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="password"
                        component="div"
                      />

                      <Field name="confirmPassword">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor="confirmPassword">
                              Password confirmation
                            </FormLabel>
                            <InputGroup>
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                              />
                              <InputRightElement h={"full"}>
                                <Button
                                  variant={"ghost"}
                                  onClick={() =>
                                    setShowPassword(
                                      (showPassword) => !showPassword
                                    )
                                  }
                                >
                                  {showPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="confirmPassword"
                        component="div"
                      />

                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText="Submitting"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          isDisabled={!props.dirty}
                          type="submit"
                        >
                          Sign up
                        </Button>
                      </Stack>
                    </Form>
                    <Stack pt={6}>
                      <Text align={"center"}>
                        Already a user? <Link color={"blue.400"} href="http://localhost:3000/login">Login</Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          );
        }}
      </Formik>
    </Box>
  );
}
