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
  export default function ChangeEmailForm() {
      
      const data = useSelector((state) => state.user.value)
      
      console.log(data);
      console.log(data.email);
   const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const resetSchema = Yup.object().shape({
        currentEmail: Yup.string()
        .required("Current email is required").oneOf([data.email], "Current email is not match"),
        
      newEmail: Yup.string()
        .required("New email is required").email("Invalid email address format")
        
    });
  
    const handleSubmit = async (data) => {
      try {
        const response = await Axios.patch(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
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
            currentEmail:"",
         newEmail: "",
        
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
                    Change your email
                  </Heading>
                  <Field name="currentEmail">
                          {({ field }) => (
                            <FormControl>
                              <FormLabel htmlFor="currentEmail">Current email</FormLabel>
                             
                                <Input
                                  {...field}
                                  type="text"
                                  id="currentEmail"
                                
                                  
                                />
                                
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
                              
                                <Input
                                  {...field}
                                  type="text"
                                  id="newEmail"
                                />
                               
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
  