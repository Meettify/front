import sportsImage from '../../assets/images/meet/sportsImage.jpg';
import campingImage from '../../assets/images/meet/campingImage.jpg';
import musicImage from '../../assets/images/meet/musicImage.jpg';
import artImage from '../../assets/images/meet/artImage.jpg';
import readingImage from '../../assets/images/meet/readingImage.jpg';
import healthImage from '../../assets/images/meet/healthImage.jpg';
import fashionImage from '../../assets/images/meet/fashionImage.jpg';
import petImage from '../../assets/images/meet/petImage.jpg';

const MeetCategoryData = [
    { categoryId: 1, categoryTitle: "SPORTS", title: "스포츠", description: "스포츠", image: sportsImage, tags: ["운동"] },
    { categoryId: 2, categoryTitle: "TRAVEL", title: "캠핑", description: "캠핑", image: campingImage, tags: ["캠핑"] },
    { categoryId: 3, categoryTitle: "MUSIC", title: "음악", description: "음악", image: musicImage, tags: ["음악"] },
    { categoryId: 4, categoryTitle: "ART", title: "예술", description: "예술", image: artImage, tags: ["예술", "미술"] },
    { categoryId: 5, categoryTitle: "READING", title: "독서", description: "독서", image: readingImage, tags: ["독서", "서적"] },
    { categoryId: 6, categoryTitle: "HEALTH", title: "건강", description: "건강", image: healthImage, tags: ["건강"] },
    { categoryId: 7, categoryTitle: "FASHION_BEAUTY", title: "패션/뷰티", description: "패션/뷰티", image: fashionImage, tags: ["패션", "뷰티"] },
    { categoryId: 8, categoryTitle: "PET_LOVERS", title: "반려동물", description: "반려동물", image: petImage, tags: ["반려동물", "애견"] },
];

export default MeetCategoryData;
