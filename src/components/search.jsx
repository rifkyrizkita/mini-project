import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
  Box,
  Text,
  Flex,
  Image,
  Heading,
} from "@chakra-ui/react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

const SearchBar = ({ blogs }) => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };
  const initialValues = {
    searchTerm: "",
  };

  const validationSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Search term is required"),
  });

  const handleSearch = async (values) => {
    try {
      let array = [];
      let i = 1;
      while (true) {
        const response = await axios.get(
          `https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${i}`
        );
        if (response.data.result.length === 0) {
          break;
        }
        const filteredBlogs = response.data.result.filter((item) => {
          return (
            item.title.includes(values.searchTerm) ||
            item.Blog_Keywords.some((keyword) =>
              keyword.Keyword.name.includes(values.searchTerm)
            ) ||
            item.Category.name.includes(values.searchTerm)
          );
        });
        array = array.concat(filteredBlogs);
        console.log(array);
        setSearchResults(array);
        i++;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box minH={"80vh"} bgColor={"gray.300"}>
        <Navbar />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSearch}
        >
          <Form>
            <Box w={"30vw"} mt={"20px"} ml={"35%"}>
              <Field name="searchTerm">
                {({ field }) => (
                  <FormControl>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        pr="4.5rem"
                        bgColor="white"
                        color="black"
                        placeholder="Enter your search"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          type="submit"
                          color={"white"}
                          colorScheme="blue"
                          variant="solid"
                        >
                          Search
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
            </Box>
          </Form>
        </Formik>
        <Box>
          {searchResults.length > 0 && (
            <Box>
              <Text fontWeight="bold">Search Results:</Text>
              <Flex mt={4} wrap={"wrap"}>
                {searchResults.map((v, i) => (
                  <Flex
                    key={i}
                    p="20px"
                    w={"25%"}
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Image
                      src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
                      boxSize="200px"
                      objectFit="cover"
                    />
                    <Heading size="md" mt="4" isTruncated maxW="400px">
                      {v.title}
                    </Heading>
                    <Text>{v.author}</Text>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleClick(v.id)}
                    >
                      Read More
                    </Button>
                  </Flex>
                ))}
              </Flex>
            </Box>
          )}
        </Box>
      </Box>
      <Box h={"20vh"}>
        <Footer />
      </Box>
    </Box>
  );
};

export default SearchBar;
