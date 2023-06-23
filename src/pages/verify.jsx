import { Box, Button } from "@chakra-ui/react"
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate, useParams} from 'react-router-dom';

export function Verify() {
    const {token} = useParams()
   const navigate = useNavigate()
    const headers = {
            Authorization: `Bearer ${token}`
        }
        const getVerified = async () => {
            
            try {
                const response = await Axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/verify', {}, {headers})
                
                console.log(response);
                navigate("/")

            }
            catch (err) {
                console.log(err);
            }
        }
    
    return(
        <Box>
            
        <Formik>
          <Button type="button" onClick={getVerified}>Verify</Button>
        </Formik>
        </Box>
    )
}