import React from 'react';
import RoundedButton from '../button/RoundedButton';

const Footer = () => {
    return (
        <footer className="mt-20">
            <div className="text-left mb-4 ml-8">
                <h4 className="font-semibold mb-2">빠른 링크</h4>
                <div className="flex space-x-4">
                    <RoundedButton>상품 등록 신청</RoundedButton>
                    <RoundedButton>반품하기</RoundedButton>
                </div>
            </div>
            <div className="flex justify-center space-x-8">
                <div className="text-md text-left">
                    <h4 className="font-semibold mb-2">쇼핑 및 알아보기</h4>
                    <ul className="text-gray-600">
                        <li className="text-base">모임 바로가기</li>
                        <li className="text-base">커뮤니티 바로가기</li>
                        <li className="text-base">쇼핑 바로가기</li>
                    </ul>
                </div>
                <div className="text-md text-left">
                    <h4 className="font-semibold mb-2">계정</h4>
                    <ul className="text-gray-600">
                        <li className="text-base">Meettify ID 관리</li>
                        <li className="text-base">Meettify 계정 정보</li>
                        <li className="text-base">Meettify.store</li>
                    </ul>
                </div>
            </div>
            <p className="text-sm text-gray-600 text-center mt-10">&copy; 2024 Meettify. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
