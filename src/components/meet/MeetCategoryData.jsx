import sportsImage from '../../assets/images/meet/sportsImage.jpg';
import campingImage from '../../assets/images/meet/campingImage.jpg';
import musicImage from '../../assets/images/meet/musicImage.jpg';
import artImage from '../../assets/images/meet/artImage.jpg';
import readingImage from '../../assets/images/meet/readingImage.jpg';
import healthImage from '../../assets/images/meet/healthImage.jpg';
import fashionImage from '../../assets/images/meet/fashionImage.jpg';
import petImage from '../../assets/images/meet/petImage.jpg';

const MeetCategoryData = [
    { categoryId: 1, title: "SPORTS", description: "스포츠", image: sportsImage, tags: ["운동"] },
    { categoryId: 2, title: "CAMPING", description: "캠핑", image: campingImage, tags: ["캠핑"] },
    { categoryId: 3, title: "MUSIC", description: "음악", image: musicImage, tags: ["음악"] },
    { categoryId: 4, title: "ART", description: "예술", image: artImage, tags: ["예술", "미술"] },
    { categoryId: 5, title: "READING", description: "독서", image: readingImage, tags: ["독서", "서적"] },
    { categoryId: 6, title: "HEALTH", description: "건강", image: healthImage, tags: ["건강"] },
    { categoryId: 7, title: "FASHION & BEAUTY", description: "패션/뷰티", image: fashionImage, tags: ["패션", "뷰티"] },
    { categoryId: 8, title: "PET LOVERS", description: "반려동물", image: petImage, tags: ["반려동물", "애견"] },
];

export default MeetCategoryData;