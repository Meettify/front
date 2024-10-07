import React, { useEffect, useRef } from 'react';

const ScrollToTop = ({ children }) => {
    const topRef = useRef(null);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [children]);

    return (
        <>
            <div ref={topRef} />
            {children}
        </>
    );
};

export default ScrollToTop;
