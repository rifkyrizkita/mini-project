import { Tabs, TabList, TabPanels, Tab, TabPanel, Table, Tbody, Tr, Td, Box, Flex, Image, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Axios from "axios"
import { useNavigate } from 'react-router-dom';

export const Article = () => {
  const [data, setdata] = useState({})
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`blog/${id}`);
  };

useEffect(() => {
  Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=DESC&size=10").then((res) => {
    console.log(res);
    setdata(res.data)
  })
}, [])

  return (
    <Box  >
      <Flex justify={"center"} >
        
    <Tabs variant="soft-rounded" bgColor={"blue.400"} w={"80%"} color={"white"} align={"center"} >
      <TabList >
        <Tab>Popular</Tab>
       
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
              <Tr>
                {data.result ? data.result.map((value, index) => {
                  return(
                    

                    <Td key={index}> {`Likes : ${value.total_fav}`}</Td>
                    

                  )
                }): null}
              </Tr>
              <Tr>
                {data.result ? data.result.map((value, index) => {
                  return(
                    

                    <Td key={index}> 
                    <Flex justifyContent={"center"} w={"100px"}>

                    <Image cursor={"pointer"} border={"1px"} w={"100px"} h={"100px"} borderRadius={"50%"} objectFit={"cover"} src={`https://minpro-blog.purwadhikabootcamp.com/${value.imageURL}`} onClick={() => handleClick(value.id)}/>
                    </Flex>
                    </Td>
                    

                  )
                }): null}
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


