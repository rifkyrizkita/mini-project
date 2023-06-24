import {
  Flex,
  HStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useEffect, useState } from "react";

export function CreateBlog() {
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null); // ditambah
  useEffect(() => {
    Axios.get(
      "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
    ).then((res) => {
      console.log(res.data);
      setCategory(res.data);
    });
  }, []);

  console.log(category);

  const createblogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    country: Yup.string().required("Country is required"),
    CategoryId: Yup.string().required("Category is required"),
    
    file: Yup.mixed().required("img is req"),
    keywords: Yup.string().required("Keyword is required"),
  });
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleSubmit = async (value) => {
    try {
      const formData = new FormData();
      const { title, content, country, CategoryId, keywords, url } = value;
      console.log({ value });
      formData.append("file", file);
      formData.append(
        "data",
        JSON.stringify({ title, content, country, CategoryId, keywords, url })
      );
      console.log([...formData]);
      const respone = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data", 
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(token);
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
        onSubmit={(value, action) => {
          handleSubmit(value);
        }}
      >
        {(props) => {
          return (
            <Form>
              <Flex>
                <Flex w={"50%"}>
                  <Box>
                    <Box >
                      <Field name="title">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input {...field} type="text" id="title" bgColor={"white"}/>
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
                            <Input {...field} type="text" id="country" bgColor={"white"}/>
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
                            <Select {...field} placeholder="Select option" bgColor={"white"}>
                              {category.map((value, index) => {
                                return (
                                  <option key={index} value={value.id}>
                                    {value.name}
                                  </option>
                                );
                                // <Text key={index}> {value.name}</Text>
                              })}
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
                            <Input {...field} type="text" id="url" bgColor={"white"}/>
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
                              onChange={(e) => { //implementasi untuk upload file ke backend
                                field.onChange(e);
                                setFile(e.target.files[0]);
                              }}
                              type="file"
                              id="file"
                              bgColor={"white"}
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
                            <Textarea {...field} type="text" id="content" bgColor={"white"}/>
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
                            <FormLabel htmlFor="url">Keywords</FormLabel>
                            <Input {...field} type="text" id="keywords" bgColor={"white"} />
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
                      <Button isDisabled={!props.dirty} type="submit">
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
