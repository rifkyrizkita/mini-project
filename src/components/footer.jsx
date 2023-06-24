import { Box, Flex, Heading, Input } from "@chakra-ui/react"
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";


export const Footer = () => {
    return (
        <Box bgGradient={"linear(to-r, blue.600, blue.400, blue.200)"} p={"20px"}>

            <Flex color={"white"} pl={"100px"} pr={"100px"} justifyContent={"space-between"}>
                <Box cursor={"pointer"} _hover={{transform:"scale(1.1)" ,transition:"0.2s"}} fontSize={"50px"} ml={"200px"}><BsFacebook/></Box>
                <Box cursor={"pointer"} _hover={{transform:"scale(1.1)" ,transition:"0.2s"}} fontSize={"50px"}><BsTwitter /></Box>
                <Box cursor={"pointer"} _hover={{transform:"scale(1.1)" ,transition:"0.2s"}} fontSize={"50px"} mr={"200px"}> <BsInstagram/> </Box>
            </Flex>
            <Flex justifyContent={"center"}>
                <Box mt={"20px"} w={"1000px"} h={"1px"} bgColor={"white"}></Box>
            </Flex>
            <Flex justifyContent={"center"} mt={"5px"}>
                <Box>
                    <Flex justifyContent={"center"} mb={"10px"}>
                        <Heading color={"white"}>Newsletter</Heading>
                    </Flex>
                    <Input placeholder="Input Your Email" color={"white"} _placeholder={{color:"white"}} w={"300px"} />
                </Box>
            </Flex>
        </Box>
    )
}