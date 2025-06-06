"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import SubscribeNewsletter from "../ui/SubscribeNewsletter";

export default function HomeSlider({ data }) {
  const [allSlides, setAllSlides] = useState(data);
  const sliderRef = useRef();

  const handleNext = () => {
    if (sliderRef.current) sliderRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    if (sliderRef.current) sliderRef.current.swiper.slidePrev();
  };

  return (
    <>
      <Swiper
        ref={sliderRef}
        loop={true}
        modules={[Navigation, EffectFade, Pagination, Autoplay]}
        effect={"fade"}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="flex w-full items-center m-0 scale-[1.001] group md:h-full transition-all min-h-[432px]"
        onMouseEnter={() => sliderRef.current.swiper.autoplay.stop()}
        onMouseLeave={() => sliderRef.current.swiper.autoplay.start()}
      >
        {allSlides.map((slider, index) => (
          <SwiperSlide
            onMouseEnter={() => sliderRef.current.swiper.autoplay.stop()}
            onMouseLeave={() => sliderRef.current.swiper.autoplay.start()}
            key={slider?.id || `slider-${index}`}
            style={{
              "--desktop-bg": `url(${slider.bannerDesk})`,
              "--tablet-bg": slider.bannerTablet
                ? `url(${slider.bannerTablet})`
                : undefined,
              "--mobile-bg": slider.bannerMobile
                ? `url(${slider.bannerMobile})`
                : undefined,
            }}
            className="bg-cover bg-center flex p-10 py-20 md:p-20 "
            {...(slider.bannerMobile && {
              "data-mobile": slider.bannerMobile,
            })}
            {...(slider.bannerTablet && {
              "data-tablet": slider.bannerTablet,
            })}
            {...(slider.bannerDesk && {
              "data-desktop": slider.bannerDesk,
            })}
          >
            <Link className="" href={`${slider.link || "#"}`}>
              <h2
                className=" text-4xl min-[450px]:text-5xl w-full md:w-12/12 md:text-6xl lg:w-8/12"
                style={{ color: slider.color }}
                dangerouslySetInnerHTML={{
                  __html: slider.title,
                }}
              />
              <p
                style={{ color: slider.color }}
                className="mt-7 font-extralight w-full md:w-7/12 text-lg md:text-xl"
                dangerouslySetInnerHTML={{
                  __html: slider.content,
                }}
              />
            </Link>
            {slider.bannerBtnName ? (
              <Link
                className="px-8 py-2 mt-10 flex bg-gradient-to-br duration-500 from-primary to-primary/90 border-r ease-in-out border-primary w-fit text-white transition-all hover:rounded-[200px] font-extralight rounded-[4px]"
                href={slider.bannerBtnLink}
              >
                {slider.bannerBtnName}
              </Link>
            ) : (
              <SubscribeNewsletter />
            )}
          </SwiperSlide>
        ))}
        {allSlides?.length > 1 && (
          <div className="bottom-[45%] px-5 max-[1000px]:!hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-[600] justify-between w-full absolute z-50">
            <button
              className="bg-neutral-100/80 backdrop-blur-2xl rounded-full hover:bg-primary transition-all hover:text-white hover:border-primary border-[0.5px] border-text/10 p-2 w-10 h-10"
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="bg-neutral-100/80 backdrop-blur-2xl rounded-full hover:bg-primary transition-all hover:text-white hover:border-primary border-[0.5px] border-text/10 p-2 w-10 h-10"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </Swiper>
    </>
  );
}
