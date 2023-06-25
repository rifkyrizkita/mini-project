import { Box, Flex, Image, Heading, Button, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LikedBlog = () => {
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
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
      setData(response.data.result);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getlikeBlog();
  }, []);

  return (
    <Flex flexWrap="wrap">
      {data?.map((v, i) => (
        <Flex
          key={i}
          p={4}
          width="20%"
          flexDirection="column"
          alignItems="center"
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
          m={4}
        >
          <Image
            src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
            boxSize="200px"
            objectFit="cover"
            borderRadius="md"
            mb={4}
          />
          <Heading size="md" mb={3} isTruncated maxW="160px">
            {v.Blog.title}
          </Heading>
          <Text fontSize="sm" mb={2}>
            {v.Blog.author}
          </Text>
          <Button
            colorScheme="blue"
            onClick={() => handleClick(v.BlogId)}
            size="sm"
            mb={2}
          >
            Read More
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};
