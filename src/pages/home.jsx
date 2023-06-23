import { Box, Center, Flex , Tabs, Tab, TabList, TabPanels, TabPanel,Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import Carousel from "../components/carousel";
import { Article} from "../components/article";
import { AllArticle } from "../components/allArticle";
import { useSelector } from "react-redux";
import { Navbar2 } from "../components/navbar2";


export function Home() {
  const data =  useSelector((state) => state.user.value)
  console.log(data);
  const token = localStorage.getItem("token")
  return (
    <>
      <Box bgColor={"gray.300"} h={"250vh"}>
        
        <Navbar/>
       

        <Box h={"700px"} border={"2px"}>
          <Flex h="500px" w={"700px"} mt={"50px"} mx={"auto"} border={"2px"}>
            <Carousel />
          </Flex>
        </Box>
          <Box border={"2px"} w={"100%"} >
            <Article/>
          </Box>
          <Box border={"2px"} w={"100%"}>
            <AllArticle/>
          </Box>
      </Box>
    </>
  );
}
