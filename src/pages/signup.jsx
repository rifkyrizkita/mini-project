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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      .min(6, "Password too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol")
      .matches(/.*[0-9].*/, 'Password must contain at least one number'),
    confirmPassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = async (data) => {
    try {
      data.FE_URL = window.location.origin;
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        data
      );
      console.log(response.data);
      navigate("/");
      toast({
        title: "Signup Successful",
        description: "You have successfully signed up.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred during signup.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
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
              bgGradient={"linear(to-r, blue.600, blue.400, blue.200)"}
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
                        Already a user?{" "}
                        <Link color={"blue.400"} href="https://main--ornate-medovik-883748.netlify.app/login">
                          Login
                        </Link>
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
