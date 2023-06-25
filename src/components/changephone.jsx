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
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ChangePhoneForm() {
  const data = useSelector((state) => state.user.value);

  console.log(data);
  console.log(data.phone);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const resetSchema = Yup.object().shape({
    currentPhone: Yup.string()
      .required("Current phone number is required")
      .oneOf([data.phone], "Current phone number is not match"),

    newPhone: Yup.string()
      .required("New phone number is required")
      .min(10, "New phone number too short")
      .max(12, "New phone number too long")
      .matches(/^\d+$/, "Phone number must contain only digits"),
  });

  const handleSubmit = async (data) => {
    try {
      data.FE_URL = window.location.origin
      const response = await Axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone",
        data,
        { headers }
      );

      console.log(response);
      localStorage.removeItem("token")
        navigate("/");
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        currentPhone: "",
        newPhone: "",
      }}
      validationSchema={resetSchema}
      onSubmit={(value, action) => {
        handleSubmit(value);
        //   action.resetForm();
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
                  Change your phone number
                </Heading>
                <Field name="currentPhone">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="currentPhone">
                        Current phone number
                      </FormLabel>

                      <Input {...field} type="text" id="currentPhone" />
                    </FormControl>
                  )}
                </Field>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="currentPhone"
                  component="div"
                />
                <Field name="newPhone">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="newPhone">New phone</FormLabel>

                      <Input {...field} type="text" id="newPhone" />
                    </FormControl>
                  )}
                </Field>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="newPhone"
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
