import { Box, Heading, Image, Text } from "@chakra-ui/react"
import  Axios  from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Blog = () => {
    const params = useParams()
    const [value, setValue] = useState()
    const getBlog = async () => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`)
            setValue(response.data[0])
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        getBlog()
    }, [])
    return(
 <>
 <Box>
    <Heading>
        {value?.title}
    </Heading>
    <Box>
        <Image src={`https://minpro-blog.purwadhikabootcamp.com/${value?.imageURL}`}/>
        <Text>{value?.content}</Text>
    </Box>
 </Box>
 </>
    )
}