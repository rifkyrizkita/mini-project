import { Avatar, Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
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
  } from '@chakra-ui/react';
  import { CheckIcon } from '@chakra-ui/icons';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Setting } from "../components/profilesetting";

export function UserProfile() {
  const navigate = useNavigate()
    const data = useSelector((state) => state.user.value)
    console.log(data);
    console.log(data.username);
    return(
        <>
        
        <Navbar/>
        <Box>

        <Flex justify={"center"} w={"25%"}><Center py={6}>
      <Box
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>
          
          <Stack direction={'row'} align={'center'} justify={'center'}>
            
            <Avatar size={"2xl"} src={`https://minpro-blog.purwadhikabootcamp.com/${data.imgProfile}`}/>
          </Stack>
            
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              
              {data.username}
            </ListItem>
            <ListItem>
              
              {data.email}
            </ListItem>
            <ListItem>
              
              {data.phone}
            </ListItem>
           
          </List>
          <Setting/>
          <Button
            mt={10}
            w={'full'}
            bg={'green.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}>
            Profile Setting
          </Button>
          <Button
            mt={10}
            w={'full'}
            bg={'green.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}
            onClick={() => navigate("/create")}>
            Create a Blog!
          </Button>
          <Button
            mt={10}
            w={'full'}
            bg={'green.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}
            onClick={() => navigate("/changepass")}>
            Change Password
          </Button>
        </Box>
      </Box>
    </Center> </Flex>

        </Box>
        </>
    )
}