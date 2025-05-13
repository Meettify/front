import sportsImage from "../../assets/images/meet/sports.avif";
import campingImage from "../../assets/images/meet/camping.jpg";
import musicImage from "../../assets/images/meet/music.jpg";
import artImage from "../../assets/images/meet/art.jpg";
import readingImage from "../../assets/images/meet/book.jpeg";
import healthImage from "../../assets/images/meet/health.jpg";
import fashionImage from "../../assets/images/meet/fashion.png";
import petImage from "../../assets/images/meet/pet.png";

const MeetCategoryData = [
  {
    categoryId: 1,
    categoryTitle: "SPORTS",
    title: "스포츠",
    description: "스포츠",
    image: sportsImage,
    tags: ["운동", "홈트"],
  },
  {
    categoryId: 2,
    categoryTitle: "TRAVEL",
    title: "여행",
    description: "여행",
    image: campingImage,
    tags: ["여행", "캠핑"],
  },
  {
    categoryId: 3,
    categoryTitle: "MUSIC",
    title: "음악",
    description: "음악",
    image: musicImage,
    tags: ["음악", "K-POP", "J-POP"],
  },
  {
    categoryId: 4,
    categoryTitle: "ART",
    title: "예술",
    description: "예술",
    image: artImage,
    tags: ["예술", "미술"],
  },
  {
    categoryId: 5,
    categoryTitle: "READING",
    title: "독서",
    description: "독서",
    image: readingImage,
    tags: ["독서", "서적"],
  },
  {
    categoryId: 6,
    categoryTitle: "HEALTH",
    title: "건강",
    description: "건강",
    image: healthImage,
    tags: ["건강"],
  },
  {
    categoryId: 7,
    categoryTitle: "FASHION_BEAUTY",
    title: "패션/뷰티",
    description: "패션/뷰티",
    image: fashionImage,
    tags: ["패션", "뷰티"],
  },
  {
    categoryId: 8,
    categoryTitle: "PET_LOVERS",
    title: "반려동물",
    description: "반려동물",
    image: petImage,
    tags: ["반려동물", "애견"],
  },
];

export default MeetCategoryData;
