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
export default function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const resetSchema = Yup.object().shape({
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
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass",
        data,
        { headers }
      );

      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
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
              bg={"gray.50"}
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
                  Enter new password
                </Heading>
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
