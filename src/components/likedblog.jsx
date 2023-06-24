import { Box, Flex, Image, Heading, Button, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const LikedBlog = () => {
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getlikeBlog = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getlikeBlog();
  }, []);

  return (
    <>
      <Flex  wrap={"wrap"}>
        {data?.map((v, i) => {
          return (
            <Flex
              key={i}
              p="20px"
              w={"25%"}
              
              mb={"10px"}
              flexDirection="column"
              alignItems="center"
            >
              <Image
                src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
                boxSize="200px"
                objectFit="cover"
              />
              <Heading size="md" mt="4" isTruncated maxW="200px">
                {v.Blog.title}
              </Heading>
              <Text>{v.Blog.author}</Text>
              <Button colorScheme="blue" onClick={() => handleClick(v.BlogId)}>
                Read More
              </Button>
            </Flex>

            
          );
        })}
      </Flex>
    </>
  );
};
