import { Tabs, TabList, TabPanels, Tab, TabPanel, Table, Tbody, Tr, Td, Box, Flex, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Axios from "axios"

export const Article = () => {
  const [data, setdata] = useState({})

useEffect(() => {
  Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav").then((res) => {
    setdata(res.data)
  })
}, [])

  return (
    <Box  >
      <Flex justify={"center"} h={"25vh"}>
        
    <Tabs variant="soft-rounded" bgColor={"white"} w={"80%"} align={"center"}>
      <TabList >
        <Tab>Popular</Tab>
        <Tab>Recent</Tab>
        
      </TabList>
      <TabPanels>
        <TabPanel>
          <Table>
            <Tbody>
              <Tr>
                {data.result ? data.result.map((value, index) => {
                  return(
                    <Td key={index}> {value.title}</Td>
                  )
                }): null}
              </Tr>
              
            </Tbody>
          </Table>
        </TabPanel>
        <TabPanel>
          <Table>
            <Tbody>
              <Tr>
                <Td>Data 3A</Td>
                <Td>Data 3B</Td>
                <Td>Data 3C</Td>
              </Tr>
              
            </Tbody>
          </Table>
        </TabPanel>
      </TabPanels>
    </Tabs>
      </Flex>
    </Box>
  );
};


