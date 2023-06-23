import { Box, Button, Image } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MyBlog = () => {
  const [data, setData] = useState();

  const token = localStorage.getItem("token");
  console.log(token);
  const showBlog = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setData(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(data);

  const delBlog = async (id) => {
    try {
      const response = await Axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    showBlog();
  }, []);

  return (
    <>
      <Box>
        {data?.map((v, i) => {
          return (
            <Box key={i}>
              <Box>{v.title}</Box>
              <Box>
                <Image
                  w={"200px"}
                  src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}
                ></Image>
                <Button onClick={() => delBlog(v.id)}> Delete </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
