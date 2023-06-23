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
    <Box bgColor={"#82AAE3"} color={"white"} h={"100px"} w={"100%"}>
      <Flex justifyContent={"space-around"} alignItems={"center"} h={"100%"}>
        <Flex fontSize={"5xl"} fontWeight={"bold"}>
          Trial Blog
        </Flex>
        <Flex>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Category
            </MenuButton>
            <MenuList color={"black"} zIndex={"2000"}>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex>
          <InputGroup size="md">
            <Input pr="4.5rem" bgColor={"white"} color={"black"} />
            <InputRightElement width="4.5rem">
              <Button>Search</Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
        {token ? (
          <Flex>
            
            <Avatar mr={"2vw"} onClick={() => navigate("/profile")} src={`https://minpro-blog.purwadhikabootcamp.com/${data.imgProfile}`}/>
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
