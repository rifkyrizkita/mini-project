import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  HStack,
  VStack
} from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Setting } from "../components/profilesetting";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { LikedBlog } from "../components/likedblog";
import { CreateBlog } from "./createblog";
import ChangeUsernameForm from "../components/changeusername";
import { ChangeAva } from "../components/changeavatar";
import { Footer } from "../components/footer";
export function UserProfile() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.user.value);
  console.log(data);
  console.log(data.username);
  return (
    <Box>

    <Box bgColor={"gray.300"} minH={"100vh"}>
      <Navbar />
      <Flex>

      <Box p={"100px"} pt={"20px"}>
            <Box
              maxW={"330px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Stack
                textAlign={"center"}
                p={6}
                color={useColorModeValue("gray.800", "white")}
                align={"center"}
              >
                <VStack direction={"row"} align={"center"} justify={"center"}>
                  <Link
                    href={`https://minpro-blog.purwadhikabootcamp.com/${data.imgProfile}`}
                    target="_blank"
                  >
                    <Avatar
                      size={"2xl"}
                      src={`https://minpro-blog.purwadhikabootcamp.com/${data.imgProfile}`}

                    />
                  </Link>
                    <ChangeAva/>
                </VStack>
              </Stack>

              <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
                <List spacing={3}>
                  <ListItem>{data.username}</ListItem>
                  <ListItem>{data.email}</ListItem>
                  <ListItem>{data.phone}</ListItem>
                </List>
                
                
                
               
              </Box>
            </Box>
      </Box>
      <Flex justify={"center"} >
        <Flex justify={"center"} w={"25%"}>
          <Center py={6}>
          </Center>
          <Flex>
            <Tabs w={"1000px"} >
              <TabList w={"20vw"}>
                <Tab>Liked Blogs</Tab>
                <Tab>Create Blog</Tab>
                <Tab>Profile Setting</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <LikedBlog />
                </TabPanel>
                <TabPanel>
                  <CreateBlog />
                </TabPanel>
                <TabPanel>

                  <VStack mt={"120px"}>

                  <Button mb={"10px"} w={"50%"} onClick={() => navigate("/changeusername")} bgColor={"blue.300"} boxShadow={"0px 0px 5px gray"} _hover={{bgColor:"blue.200" , transition:"0.3s"}}>
                    Change username
                  </Button>
                  <Button mb={"10px"} w={"50%"} onClick={() => navigate("/changeemail")} bgColor={"blue.300"} boxShadow={"0px 0px 5px gray"} _hover={{bgColor:"blue.200" , transition:"0.3s"}}>
                    Change email
                  </Button>
                  <Button mb={"10px"} w={"50%"} onClick={() => navigate("/changephone")} bgColor={"blue.300"} boxShadow={"0px 0px 5px gray"} _hover={{bgColor:"blue.200" , transition:"0.3s"}}>
                    Change phone number
                  </Button>
                  <Button mb={"10px"} w={"50%"} onClick={() => navigate("/changepass")} bgColor={"blue.300"} boxShadow={"0px 0px 5px gray"} _hover={{bgColor:"blue.200" , transition:"0.3s"}}>
                    Change password
                  </Button>
                  
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
              </Flex>
      </Flex>
    </Box>
    <Box>
      <Footer/>
    </Box>
    </Box>
  );
}
