import { FaFutbol, FaPlane, FaMusic, FaPalette, FaBook, FaHeartbeat, FaTshirt, FaPaw } from 'react-icons/fa';
import { IoGridOutline } from "react-icons/io5";

// 카테고리 목록
const categories = [
    { id: 'all', name: '전체', icon: () => <IoGridOutline />, color: "#007BFF" },
    { id: 'SPORTS', name: '스포츠', icon: () => <FaFutbol />, color: "#f48346" },
    { id: 'TRAVEL', name: '여행', icon: () => <FaPlane />, color: "#00aab2" },
    { id: 'MUSIC', name: '음악', icon: () => <FaMusic />, color: "#e2ab00" },
    { id: 'ART', name: '예술', icon: () => <FaPalette />, color: "#f162a7" },
    { id: 'READING', name: '독서', icon: () => <FaBook />, color: "#bc7e61" },
    { id: 'HEALTH', name: '건강', icon: () => <FaHeartbeat />, color: "#f14f4f" },
    { id: 'FASHION_BEAUTY', name: '패션/뷰티', icon: () => <FaTshirt />, color: "#b92aff" },
    { id: 'PET_LOVERS', name: '반려동물', icon: () => <FaPaw />, color: "#72c204" }
];

export default categories;