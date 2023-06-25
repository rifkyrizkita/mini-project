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
  export default function ChangeUsernameForm() {
      const [showPassword, setShowPassword] = useState(false);
      const data = useSelector((state) => state.user.value)
      const name = data.username
      console.log(name);
      console.log(data.username);
   const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const resetSchema = Yup.object().shape({
        currentUsername: Yup.string()
        .required("Current username is required").oneOf([data.username], "Current username is not match"),
        
      newUsername: Yup.string()
        .required("New username is required")
        
    });
  
    const handleSubmit = async (data) => {
      try {
        data.FE_URL = window.location.origin
        const response = await Axios.patch(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
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
            currentUsername:"",
         newUsername: "",
        
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
                    Change your username
                  </Heading>
                  <Field name="currentUsername">
                          {({ field }) => (
                            <FormControl>
                              <FormLabel htmlFor="currentUsername">Current username</FormLabel>
                             
                                <Input
                                  {...field}
                                  type="text"
                                  id="currentUsername"
                                
                                  
                                />
                                
                            </FormControl>
                          )}
                        </Field>
                        <ErrorMessage
                          style={{ color: "red" }}
                          name="currentUsername"
                          component="div"
                        />
                  <Field name="newUsername">
                          {({ field }) => (
                            <FormControl>
                              <FormLabel htmlFor="newUsername">New username</FormLabel>
                              
                                <Input
                                  {...field}
                                  type="text"
                                  id="newUsername"
                                />
                               
                            </FormControl>
                          )}
                        </Field>
                        <ErrorMessage
                          style={{ color: "red" }}
                          name="newUsername"
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
  