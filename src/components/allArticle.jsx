import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export function AllArticle() {
  const params = useParams();
  const navigate = useNavigate();
  const [recentData, setRecentData] = useState({});
  const [oldestData, setOldestData] = useState({});
  const [recentPage, setRecentPage] = useState(1);
  const [oldestPage, setOldestPage] = useState(1);

  const handleClick = (id) => {
    navigate(`blog/${id}`);
  };

  const handleRecentNextPage = () => {
    setRecentPage(recentPage + 1);
  };

  const handleRecentPreviousPage = () => {
    if (recentPage > 1) {
      setRecentPage(recentPage - 1);
    }
  };

  const handleOldestNextPage = () => {
    setOldestPage(oldestPage + 1);
  };

  const handleOldestPreviousPage = () => {
    if (oldestPage > 1) {
      setOldestPage(oldestPage - 1);
    }
  };

  useEffect(() => {
    Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog`, {
      params: {
        sort: "DESC",
        page: recentPage,
      },
    }).then((res) => {
      setRecentData(res.data);
    });

    Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog`, {
      params: {
        sort: "ASC",
        page: oldestPage,
      },
    }).then((res) => {
      setOldestData(res.data);
    });
  }, [recentPage, oldestPage]);

  return (
    <Box w={"100%"}>
      <Tabs>
        <TabList>
          <Tab>Recent</Tab>
          <Tab>Oldest</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex wrap={"wrap"} align={"center"} h={"100%"}  rowGap={"20px"}>
              {recentData.result?.map((value, index) => (
                <Flex
                  key={index}
                  p="20px"
                  w={"25%"}
                  
                  flexDirection="column"
                  alignItems="center"
                >
                  <Image
                    src={`https://minpro-blog.purwadhikabootcamp.com/${value.imageURL}`}
                    boxSize="200px"
                    objectFit="cover"
                  />
                  <Heading size="md" mt="4" isTruncated maxW="400px">
                    {value.title}
                  </Heading>
                  <Text>{value.author}</Text>
                  <Button colorScheme="blue" onClick={() => handleClick(value.id)}>
                    Read More
                  </Button>
                </Flex>
              ))}
            </Flex>
            <Flex justifyContent="center" mt="4">
              <IconButton
                onClick={handleRecentPreviousPage}
                isDisabled={recentPage === 1}
                colorScheme="blue"
                icon={<ArrowBackIcon />}
              />

              <IconButton
              isDisabled={recentData.blogPage === recentData.page}
                onClick={handleRecentNextPage}
                ml="2"
                colorScheme="blue"
                icon={<ArrowForwardIcon />}
              />
            </Flex>
          </TabPanel>
          <TabPanel> 
            <Flex wrap={"wrap"} align={"center"} h={"100%"} rowGap={"20px"}>
              {oldestData.result?.map((value, index) => (
                <Flex
                  key={index}
                  p="20px"
                  w={"25%"}
                  
                  flexDirection="column"
                  alignItems="center"
                >
                  <Image
                    src={`https://minpro-blog.purwadhikabootcamp.com/${value.imageURL}`}
                    boxSize="200px"
                    objectFit="cover"
                  />
                  <Heading size="md" mt="4" isTruncated maxW="400px">
                    {value.title}
                  </Heading>
                  <Text>{value.author}</Text>
                  <Button colorScheme="blue" onClick={() => handleClick(value.id)}>
                    Read More
                  </Button>
                </Flex>
              ))}
            </Flex>
            <Flex justifyContent="center" mt="4">
              <IconButton
                onClick={handleOldestPreviousPage}
                isDisabled={oldestPage === 1}
                colorScheme="blue"
                icon={<ArrowBackIcon />}
              />

              <IconButton
                onClick={handleOldestNextPage}
                isDisabled={oldestData.blogPage === oldestData.page}
                ml="2"
                colorScheme="blue"
                icon={<ArrowForwardIcon />}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
