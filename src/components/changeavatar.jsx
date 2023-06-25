import { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setValue } from "../redux/userSlice";
import { Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";

export function ChangeAva() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const toast = useToast(); // Initialize the useToast hook

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const changeAva = Yup.object().shape({
    imgProfile: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (value) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded",
        formData,
        { headers }
      );
      console.log(response);
      dispatch(setValue(response.data.imgProfile));
      window.location.reload();
      toast({
        title: "Avatar Changed",
        description: "Your avatar has been successfully changed.",
        status: "success",
        duration: 3000,
        position: "top", // Set the position to top
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while changing the avatar.",
        status: "error",
        duration: 3000,
        position: "top", // Set the position to top
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        imgProfile: "",
      }}
      validationSchema={changeAva}
      onSubmit={(value, actions) => {
        handleSubmit(value);
      }}
    >
      {(props) => {
        return (
          <Form>
            <Field name="imgProfile">
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="imgProfile">Choose an image</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setFile(e.target.files[0]);
                    }}
                    type="file"
                    id="imgProfile"
                  />
                </FormControl>
              )}
            </Field>
            <ErrorMessage
              style={{ color: "red" }}
              name="imgProfile"
              component="div"
            />
            <Button
              isDisabled={!props.dirty}
              type="submit"
              mt={"10px"}
            >
              Change
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
