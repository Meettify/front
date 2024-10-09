    import sportsImage from '../../assets/images/meet/sportsImage.jpg';
    import campingImage from '../../assets/images/meet/campingImage.jpg';
    import musicImage from '../../assets/images/meet/musicImage.jpg';
    import artImage from '../../assets/images/meet/artImage.jpg';
    import readingImage from '../../assets/images/meet/readingImage.jpg';
    import healthImage from '../../assets/images/meet/healthImage.jpg';
    import fashionImage from '../../assets/images/meet/fashionImage.jpg';
    import petImage from '../../assets/images/meet/petImage.jpg';

    const MeetListData = [
        // 스포츠 카테고리
        { id: 1, title: "SPORTS 1", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },
        { id: 2, title: "SPORTS 2", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },
        { id: 3, title: "SPORTS 3", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },
        { id: 4, title: "SPORTS 4", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },
        { id: 5, title: "SPORTS 5", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },
        { id: 6, title: "SPORTS 6", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },
        { id: 7, title: "SPORTS 7", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },
        { id: 8, title: "SPORTS 8", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },
        { id: 9, title: "SPORTS 9", description: "스포츠에 대한 모임입니다.", image: sportsImage, tags: ["운동"], categoryId: 1 },

        // 캠핑 카테고리
        { id: 10, title: "CAMPING 1", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },
        { id: 11, title: "CAMPING 2", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },
        { id: 12, title: "CAMPING 3", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },
        { id: 13, title: "CAMPING 4", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },
        { id: 14, title: "CAMPING 5", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },
        { id: 15, title: "CAMPING 6", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },
        { id: 16, title: "CAMPING 7", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },
        { id: 17, title: "CAMPING 8", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },
        { id: 18, title: "CAMPING 9", description: "자연 속에서 캠핑하는 모임입니다.", image: campingImage, tags: ["자연", "모험"], categoryId: 2 },

        // 음악 카테고리
        { id: 19, title: "MUSIC 1", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },
        { id: 20, title: "MUSIC 2", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },
        { id: 21, title: "MUSIC 3", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },
        { id: 22, title: "MUSIC 4", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },
        { id: 23, title: "MUSIC 5", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },
        { id: 24, title: "MUSIC 6", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },
        { id: 25, title: "MUSIC 7", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },
        { id: 26, title: "MUSIC 8", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },
        { id: 27, title: "MUSIC 9", description: "음악을 사랑하는 모임입니다.", image: musicImage, tags: ["음악"], categoryId: 3 },

        // 예술 카테고리
        { id: 28, title: "ART 1", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },
        { id: 29, title: "ART 2", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },
        { id: 30, title: "ART 3", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },
        { id: 31, title: "ART 4", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },
        { id: 32, title: "ART 5", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },
        { id: 33, title: "ART 6", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },
        { id: 34, title: "ART 7", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },
        { id: 35, title: "ART 8", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },
        { id: 36, title: "ART 9", description: "예술에 대한 모임입니다.", image: artImage, tags: ["예술", "미술"], categoryId: 4 },

        // 독서 카테고리
        { id: 37, title: "READING 1", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },
        { id: 38, title: "READING 2", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },
        { id: 39, title: "READING 3", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },
        { id: 40, title: "READING 4", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },
        { id: 41, title: "READING 5", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },
        { id: 42, title: "READING 6", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },
        { id: 43, title: "READING 7", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },
        { id: 44, title: "READING 8", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },
        { id: 45, title: "READING 9", description: "독서를 사랑하는 모임입니다.", image: readingImage, tags: ["독서"], categoryId: 5 },

        // 건강 카테고리
        { id: 46, title: "HEALTH 1", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },
        { id: 47, title: "HEALTH 2", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },
        { id: 48, title: "HEALTH 3", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },
        { id: 49, title: "HEALTH 4", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },
        { id: 50, title: "HEALTH 5", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },
        { id: 51, title: "HEALTH 6", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },
        { id: 52, title: "HEALTH 7", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },
        { id: 53, title: "HEALTH 8", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },
        { id: 54, title: "HEALTH 9", description: "건강을 중시하는 모임입니다.", image: healthImage, tags: ["건강"], categoryId: 6 },

        // 패션 & 뷰티 카테고리
        { id: 55, title: "FASHION & BEAUTY 1", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },
        { id: 56, title: "FASHION & BEAUTY 2", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },
        { id: 57, title: "FASHION & BEAUTY 3", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },
        { id: 58, title: "FASHION & BEAUTY 4", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },
        { id: 59, title: "FASHION & BEAUTY 5", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },
        { id: 60, title: "FASHION & BEAUTY 6", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },
        { id: 61, title: "FASHION & BEAUTY 7", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },
        { id: 62, title: "FASHION & BEAUTY 8", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },
        { id: 63, title: "FASHION & BEAUTY 9", description: "패션과 뷰티를 사랑하는 모임입니다.", image: fashionImage, tags: ["패션", "뷰티"], categoryId: 7 },

        // 반려동물 카테고리
        { id: 64, title: "PET LOVERS 1", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
        { id: 65, title: "PET LOVERS 2", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
        { id: 66, title: "PET LOVERS 3", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
        { id: 67, title: "PET LOVERS 4", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
        { id: 68, title: "PET LOVERS 5", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
        { id: 69, title: "PET LOVERS 6", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
        { id: 70, title: "PET LOVERS 7", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
        { id: 71, title: "PET LOVERS 8", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
        { id: 72, title: "PET LOVERS 9", description: "반려동물을 사랑하는 모임입니다.", image: petImage, tags: ["반려동물", "애견"], categoryId: 8 },
    ];

    export default MeetListData;