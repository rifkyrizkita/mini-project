import { Avatar, Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Like } from "./like";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export const Blog = () => {
  const params = useParams();
  const [value, setValue] = useState();

  const getBlog = async () => {
    try {
      const response = await Axios.get(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`
      );
      setValue(response.data[0]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <Box bgColor={"gray.300"} minH={"100vh"}>
      <Navbar />
      <Flex justifyContent={"center"} p={"20px"} minH={"80vh"}>
        <Box>
          <Heading mb={"10px"}>{value?.title}</Heading>
          <Box maxW={"40vw"}>
            <Link
              href={`https://minpro-blog.purwadhikabootcamp.com/${value?.imageURL}`}
              target="_blank"
            >
              <Image
                w={"100%"}
                h={"400px"}
                objectFit="cover"
                src={`https://minpro-blog.purwadhikabootcamp.com/${value?.imageURL}`}
              />
            </Link>
            <Flex alignItems="center" my="2">
              <Avatar
                src={`https://minpro-blog.purwadhikabootcamp.com/${value?.imgProfile}`}
                size="sm"
                mr="2"
              />
              <Text fontWeight={"bold"} fontSize={"lg"}>
                {`by: ${value?.User.username}`}
              </Text>
            </Flex>
            <Text>{value?.Category.name}</Text>
            <Text mb={"2vh"}>
              {new Date(`${value?.createdAt}`).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </Text>
            <Text fontSize={"lg"}>{value?.content}</Text>
            <Like />
          </Box>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};
