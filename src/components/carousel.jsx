import { Box, Link } from "@chakra-ui/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { useEffect, useState } from "react";
import { Image, Text, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleClick = (id) => {
    navigate(`blog/${id}`);
  };

  // https://flatlogic.com/blog/react-fetch-data-guide/
  useEffect(() => {
    Axios.get(
      // useeffect ga bisa async awit
      "https://minpro-blog.purwadhikabootcamp.com/api/blog"
    ).then((res) => {
      setData(res.data);
      console.log(res.data.result);
    });
  }, []);

  return (
    <>
      <Swiper 
        slidesPerView={1}
        spaceBetween={30}
        loop
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data.result
          ? data.result.map((value, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box h={"100%"} w={"100%"}>
                    <Image
                      src={`https://minpro-blog.purwadhikabootcamp.com/${value.imageURL}`}
                      position={"absolute"}
                    />
                    <Box
                      position={"relative"}
                      p={"20px"}
                      bgColor={"rgba(0,0,0,0.5)"}
                      color={"white"}
                      w={"100%"}
                    >
                      <Heading
                        cursor={"pointer"}
                        onClick={() => handleClick(value.id)}
                        isTruncated maxW="1000px"
                      >
                        {value.title}
                      </Heading>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
    </>
  );
}
