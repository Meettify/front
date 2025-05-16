import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import sport from "../../assets/images/meet/sports.avif";
import travel from "../../assets/images/meet/camping.jpg";
import music from "../../assets/images/meet/music.jpg";
import art from "../../assets/images/meet/art.jpg";
import book from "../../assets/images/meet/book.jpeg";
import health from "../../assets/images/meet/health.jpg";
import fashion from "../../assets/images/meet/fashion.png";
import pet from "../../assets/images/meet/pet.png";
import community1 from "../../assets/images/community1.jpg";
import community2 from "../../assets/images/community2.jpg";
import community3 from "../../assets/images/community3.jpg";
import shopping1 from "../../assets/images/shopping1.png";
import shopping2 from "../../assets/images/shopping2.jpg";
import shopping3 from "../../assets/images/shopping3.png";

// 각 섹션별 이미지 배열
const communityImages = [community1, community2, community3];

const meetImages = [sport, travel, music, art, book, health, fashion, pet];

const shoppingImages = [shopping1, shopping2, shopping3];

// 각 섹션
const features = [
  {
    title: "커뮤니티",
    desc: "자유롭게 생각을 나누고 공감할 사람들과의 이야기 공간",
    link: "/comm",
    images: communityImages,
    isSwiper: true,
  },
  {
    title: "모임",
    desc: "취향이 같은 사람들과 함께하는 온/오프라인 만남",
    link: "/meet",
    images: meetImages,
    isSwiper: true,
  },
  {
    title: "쇼핑",
    desc: "모임에 필요한 상품을 한눈에 쉽게",
    link: "/shop",
    images: shoppingImages,
    isSwiper: true,
  },
];

const HomeSectionUnder = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Meettify에서 즐기세요~
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <Link to={feature.link} key={idx}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              {feature.isSwiper ? (
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 5000 }}
                  loop
                  className="w-full h-48"
                >
                  {feature.images.map((imgSrc, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={imgSrc}
                        alt={`Slide ${i}`}
                        className="w-full h-48 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeSectionUnder;
