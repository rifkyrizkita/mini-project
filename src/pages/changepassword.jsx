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
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const toast = useToast();
  const resetSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required("Current password is required")
      .min(6, "Password too short")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol")
      .matches(/.*[0-9].*/, 'Password must contain at least one number'),
    password: Yup.string()
      .required("New password is required")
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
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",
        data,
        { headers }
      );

      console.log(response);
      localStorage.removeItem("token");
      navigate("/");
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to Change Password",
        description: "An error occurred while changing your password. Please try again later.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={resetSchema}
      onSubmit={(value, action) => {
        handleSubmit(value);
        action.resetForm();
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
                  Change your password
                </Heading>
                <Field name="currentPassword">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          id="currentPassword"
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="currentPassword"
                  component="div"
                />
                <Field name="password">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="password">New Password</FormLabel>
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
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
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
                      <FormLabel htmlFor="confirmPassword">Password confirmation</FormLabel>
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
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
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
