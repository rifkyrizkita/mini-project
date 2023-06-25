import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";

export function CreateBlog() {
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createblogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    country: Yup.string().required("Country is required"),
    CategoryId: Yup.string().required("Category is required"),
    file: Yup.mixed().required("Image is required"),
    keywords: Yup.string().required("Keyword is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      const { title, content, country, CategoryId, keywords, url } = values;

      formData.append("file", file);
      formData.append(
        "data",
        JSON.stringify({ title, content, country, CategoryId, keywords, url })
      );

      await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          "Content-Type": "multipart/form-data",
        }
      );

      toast({
        title: "Blog Created",
        description: "Your blog has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      values.title = "";
      values.content = "";
      values.country = "";
      values.CategoryId = "";
      values.url = "";
      values.keywords = "";
      setFile(null);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while creating the blog.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          content: "",
          country: "",
          CategoryId: "",
          url: "",
          keywords: "",
          file: null,
        }}
        validationSchema={createblogSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(props) => (
          <Form>
            <Flex>
              <Flex w={"50%"}>
                <Box>
                  <Box>
                    <Field name="title">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="title">Title</FormLabel>
                          <Input {...field} type="text" id="title" />
                        </FormControl>
                      )}
                    </Field>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="title"
                      component="div"
                    />
                  </Box>
                  <Box>
                    <Field name="country">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="country">Country</FormLabel>
                          <Input {...field} type="text" id="country" />
                        </FormControl>
                      )}
                    </Field>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="country"
                      component="div"
                    />
                  </Box>
                  <Box>
                    <Field name="CategoryId">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="CategoryId">Category</FormLabel>
                          <Select {...field} placeholder="Select option">
                            {category.map((value) => (
                              <option key={value.id} value={value.id}>
                                {value.name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="CategoryId"
                      component="div"
                    />
                  </Box>
                  <Box>
                    <Field name="url">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="url">Link</FormLabel>
                          <Input {...field} type="text" id="url" />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="file">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="file">File</FormLabel>
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setFile(e.target.files[0]);
                            }}
                            type="file"
                            id="file"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="file"
                      component="div"
                    />
                  </Box>
                </Box>
              </Flex>
              <Flex w={"50%"}>
                <Box>
                  <Box>
                    <Field name="content">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="content">
                            Your Blog Content
                          </FormLabel>
                          <Textarea {...field} type="text" id="content" />
                        </FormControl>
                      )}
                    </Field>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="content"
                      component="div"
                    />
                  </Box>
                  <Box>
                    <Field name="keywords">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="keywords">Keywords</FormLabel>
                          <Input {...field} type="text" id="keywords" />
                        </FormControl>
                      )}
                    </Field>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="keywords"
                      component="div"
                    />
                  </Box>
                  <Box>
                    <Button
                      isDisabled={!props.dirty}
                      type="submit"
                      mt={4}
                      colorScheme="blue"
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
}
