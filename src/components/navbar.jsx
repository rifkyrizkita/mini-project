import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function Navbar() {
  const data = useSelector((state) => state.user.value)
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => { 
    
    localStorage.removeItem("token")
    setTimeout(() => {
      
      navigate("/")
    }, 1000)}
  return (
    <Box bgGradient={"linear(to-r,blue.600,blue.400,blue.200)"} color={"white"} h={"100px"} w={"100%"} boxShadow={"3px 3px 5px gray"}>
      <Flex justifyContent={"space-around"} alignItems={"center"} h={"100%"}>
        <Flex fontSize={"5xl"} fontWeight={"bold"} _hover={{transform:"scale(1.2)", transition:"0.3s"}} cursor={"pointer"} onClick={() => navigate("/")}>
          Trial Blog
        </Flex>
        
        <Flex>
          
              <Button onClick={() => navigate("/search")}>Search</Button>
           
        </Flex>
        {token ? (
          <Flex>
            
            <Avatar cursor="pointer" mr={"2vw"} onClick={() => navigate("/profile")} src={`https://minpro-blog.purwadhikabootcamp.com/${data.imgProfile}`}/>
            <Button onClick={logout}>Log out</Button>
          </Flex>
        ) : (
          <Flex>
            <Button mr={"2vw"} onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
