import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const forgotSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  const handleSubmit = async (data) => {
    try {
      data.FE_URL = window.location.origin;
      const response = await Axios.put(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",
        data
      );
      console.log(response);
      navigate("/");
      toast({
        title: "Reset Password Email Sent",
        description: "An email with a reset link has been sent to your email address.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to Reset Password",
        description: "An error occurred while resetting your password. Please try again later.",
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
        email: "",
      }}
      validationSchema={forgotSchema}
      onSubmit={(value, action) => {
        handleSubmit(value);
        // action.resetForm()
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
                Forgot your password?
              </Heading>
              <Text fontSize={{ base: "sm", sm: "md" }} color={"gray.800"}>
                You'll get an email with a reset link
              </Text>
              <Form>
                <Field name="email">
                  {({ field }) => (
                    <FormControl id="email">
                      <Input id="email" type="email" {...field} />
                    </FormControl>
                  )}
                </Field>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="email"
                  component="div"
                />

                <Stack spacing={6} mt={"2vh"}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    isDisabled={!props.dirty}
                    type="submit"
                  >
                    Request Reset
                  </Button>
                </Stack>
              </Form>
            </Stack>
          </Flex>
        );
      }}
    </Formik>
  );
}
