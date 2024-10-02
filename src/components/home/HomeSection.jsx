import React from 'react';
import { Link } from 'react-router-dom';

const HomeSection = ({ imageUrl, buttonText, linkTo }) => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen"
            style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: imageUrl ? 'transparent' : '#e0e0e0',
            }}>

            <div className="mt-80">
                <Link to={linkTo}>
                    <button className="border border-white text-white py-4 px-28 text-xl bg-transparent hover:bg-white/90 hover:text-black hover:border-white hover:border-opacity-50 transition duration-300 shadow-md">
                        {buttonText}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomeSection;