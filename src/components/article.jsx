import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Image, Text, Heading, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Article = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`blog/${id}`);
  };

  useEffect(() => {
    Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=DESC&size=10")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box w="100%" p={4} bg="blue.400">
      <Tabs variant="soft-rounded" colorScheme="blue" align="center">
        <TabList>
          <Tab _selected={{ color: 'blue.400', bg: 'white' }}>Popular</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex wrap="wrap" justify="center" align="center" rowGap={4} columnGap={4}>
              {data.result &&
                data.result.map((value, index) => (
                  <Box
                    key={index}
                    w="300px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    bg="white"
                    boxShadow="md"
                    transition="transform 0.3s"
                    _hover={{ transform: 'scale(1.02)' }}
                  >
                    <Image src={`https://minpro-blog.purwadhikabootcamp.com/${value.imageURL}`} alt={value.title} boxSize="300px" objectFit="cover" />
                    <Box p={4}>
                      <Heading size="md" mb={2} isTruncated maxW="100%" fontWeight="semibold" fontSize="lg">
                        {value.title}
                      </Heading>
                      <Text color="gray.600" fontSize="sm" overflowWrap="break-word">
                        {`Likes: ${value.total_fav}`}
                      </Text>
                      <Box mt={4}>
                        <Button
                          colorScheme="blue"
                          onClick={() => handleClick(value.id)}
                          size="sm"
                          fontWeight="bold"
                          _hover={{ opacity: 0.8 }}
                          overflowWrap="break-word"
                        >
                          Read More
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
