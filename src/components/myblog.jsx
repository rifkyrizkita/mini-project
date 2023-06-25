import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyBlog = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const showBlog = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const delBlog = async (id) => {
    try {
      const response = await Axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showBlog();
  }, []);

  return (
    <Box>
      <Flex wrap="wrap" justifyContent="center" gap={6}>
        {data.map((v, i) => (
          <Flex
            key={i}
            p={6}
            w={{ base: "100%", sm: "50%", md: "20%" }}
            flexDirection="column"
            alignItems="center"
            boxShadow="md"
            borderRadius="md"
            bg="white"
          >
            <Image
              src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
              boxSize="200px"
              objectFit="cover"
              mb={4}
              borderRadius="md"
            />
            <Heading size="md" mb={2} isTruncated maxW="200px">
              {v.title}
            </Heading>
            
            <Flex align="center" mt={4}>
              <Button
                colorScheme="blue"
                mr={2}
                onClick={() => handleClick(v.id)}
              >
                Read More
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => delBlog(v.id)}
              >
                <FaTrash />
              </Button>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
