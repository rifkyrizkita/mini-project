import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";

export default function ForgotPasswordForm() {
  const forgotSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
  });
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.put(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",
        data
      );
    } catch (error) {
      console.log(error);
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
                Forgot your password?
              </Heading>
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                color={"gray.800"}
              >
                You&apos;ll get an email with a reset link
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
