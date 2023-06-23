import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setValue } from "../redux/userSlice";
export function LoginPhone() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
const dispatch = useDispatch()
  const loginSchema = Yup.object().shape({
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
  });

  const handleSubmit = async (data) => {
    try {
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
        data
      );
      dispatch(setValue(response.data.isAccountExist));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Formik
        initialValues={{
          phone: "",

          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(value, action) => {
          handleSubmit(value);
          // action.resetForm();
          navigate("/")
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
                  <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                </Stack>
                <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                  <Stack spacing={4}>
                    <Button
                      colorScheme="blue"
                      onClick={() => navigate("/login")}
                    >
                      username
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => navigate("/loginemail")}
                    >
                      email
                    </Button>
                    <Form>
                      <Field name="phone">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor="phone">Phone</FormLabel>
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
                        {({ field }) => {
                          return (
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
                          );
                        }}
                      </Field>
                      <ErrorMessage
                        style={{ color: "red" }}
                        name="password"
                        component="div"
                      />
                      <Stack spacing={10}>
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          align={"start"}
                          justify={"space-between"}
                        >
                          <Checkbox>Remember me</Checkbox>
                          <Link color={"blue.400"} href="http://localhost:3000/forgot">Forgot password?</Link>
                        </Stack>
                        <Button
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          isDisabled={!props.dirty}
                          type="submit"
                        >
                          Sign in
                        </Button>
                      </Stack>
                    </Form>
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
