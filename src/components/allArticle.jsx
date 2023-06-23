import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
export function AllArticle() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (id) => {
    navigate(`blog/${id}`);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    Axios.get(
      `https://minpro-blog.purwadhikabootcamp.com/api/blog`,
      {
        params: {
          sort: "ASC",
          page: currentPage,
        },
      }
    ).then((res) => {
      setData(res.data);
      console.log(res.data.result);
    });
  }, [currentPage]);

  return (
    <Box w={"100%"}>
      <Flex wrap={"wrap"} align={"center"} h={"100%"} border={"2px"} rowGap={"20px"}>
        {data.result
          ? data.result.map((value, index) => {
              return (
                <Flex
                  key={index}
                  p="20px"
                  w={"25%"}
                  border={"2px"}
                  flexDirection="column"
                  alignItems="center"
                >
                  <Image src={`https://minpro-blog.purwadhikabootcamp.com/${value.imageURL}`}  boxSize="200px" objectFit="cover" />
                  <Heading size="md" mt="4" isTruncated maxW="400px">
                    {value.title}
                  </Heading>
                  <Text>{value.author}</Text>
                  <Button colorScheme="blue" onClick={() => handleClick(value.id)}>
                    Read More
                  </Button>
                </Flex>
              );
            })
          : null}
      </Flex>
      <Flex justifyContent="center" mt="4">
        <IconButton onClick={handlePreviousPage} isDisabled={currentPage === 1} colorScheme="blue" icon={<ArrowBackIcon/>}/>
          
        
        <IconButton onClick={handleNextPage} ml="2" colorScheme="blue" icon={<ArrowForwardIcon/>}/>
         
      </Flex>
    </Box>
  );
}
