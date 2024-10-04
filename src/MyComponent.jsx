import React from 'react';
import { useMediaQuery } from 'react-responsive';

const MyComponent = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div style={{ backgroundColor: isMobile ? 'lightcoral' : 'lightblue' }}>
            {isMobile ? '모바일 화면입니다.' : '데스크탑 화면입니다.'}
        </div>
    );
};

export default MyComponent;
