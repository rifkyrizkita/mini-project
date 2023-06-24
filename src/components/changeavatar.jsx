import { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setValue } from "../redux/userSlice";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export function ChangeAva() {
    const[file, setFile] = useState(null)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    
    const headers = {
        Authorization: `Bearer ${token}`,
      };
    const changeAva = Yup.object().shape({
        imgProfile: Yup.mixed().required("img is req")
    })
const handleSubmit = async (value) => {
    try {
        const formData = new FormData()
        formData.append("file", file)
        const response = await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded", formData, {headers})
        console.log(response);
        dispatch(setValue(response.data.imgProfile));
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
}
    return(
 <Formik
 initialValues={{
    imgProfile: ""
 }}
 validationSchema={changeAva}
 onSubmit={(value, actions) => {
    handleSubmit(value)
 }}
 >
    {(props) =>{
        return(
            <Form>
                <Field name="imgProfile" >
                    {({field}) => (
                        <FormControl>
                           <FormLabel html="imgProfile"></FormLabel>
                           <Input
                           {...field}
                           onChange={(e) => {
                            field.onChange(e)
                            setFile(e.target.files[0])
                           }}
                           type="file"
                           id="imgProfile"
                           />
                        </FormControl>
                    )}
                </Field>
                <ErrorMessage
                        style={{ color: "red" }}
                        name="imgProfile"
                        component="div"
                      />
                      <Button isDisabled={!props.dirty} type="submit" mt={"10px"}>Change</Button>
            </Form>
        )
    }}
 </Formik>
    )
}