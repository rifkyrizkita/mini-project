import React from "react";
import { Formik } from "formik";
import { Box, Button, useToast } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Like = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  const handleLike = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    const data = {
      BlogId: id,
    };

    try {
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/like",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );
      console.log(response.data);
      console.log(data);

      // Menampilkan toast ketika like berhasil
      toast({
        title: "Liked",
        description: "You liked the blog.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.log(error);

      // Menampilkan toast ketika terjadi error
      toast({
        title: "Error",
        description: "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <Box>
      <Formik>
        <Button
          colorScheme="blue"
          onClick={handleLike}
          leftIcon={<AiFillHeart />}
        >
          Like
        </Button>
      </Formik>
    </Box>
  );
};
