// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .swiper-pagination-bullet {
    background: #d8d8d8;
    opacity: 1;
    border-radius: 100px;
    transition: all 0.2s ease-in;
  }
  .swiper-pagination-bullet-active {
    background: #ff6f61;
    width: 50px;
    transition: all 0.2s ease-in;
  }
`;

export const Slider = ({ slidesPerView = 1, spaceBetween = 0, children }) => {
  return (
    <Wrapper>
      <Swiper
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
      >
        {React.Children.map(children, (child) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};
