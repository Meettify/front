import React from 'react';
import RoundedButton from '../button/RoundedButton';
import logo from '../../assets/logo/meettify_logo.svg';
import "./Footer.css";
import { Link } from 'react-router-dom';
import { BsChevronRight } from "react-icons/bs";
import imgLinkReturn from "../../assets/images/img-link-return.png";
import imgLinkRegister from "../../assets/images/img-link-register.png";

const Footer = () => {
    return (
        <footer>
            <div className="logo-wrap">
                <img src={logo} alt="Meettify Logo" className='logo'/>
            </div>
            <div className='footer-content-area'>
                <div className="footer-link-area">
                    <div className="footer-link footer-link-shop">
                        <h4>쇼핑 및 알아보기</h4>
                        <ul>
                            <li className="text-base"><Link to="#">모임 바로가기</Link></li>
                            <li className="text-base"><Link to="#">커뮤니티 바로가기</Link></li>
                            <li className="text-base"><Link to="#">쇼핑 바로가기</Link></li>
                        </ul>
                    </div>
                    <div className="footer-link footer-link-account">
                        <h4>계정</h4>
                        <ul>
                            <li className="text-base"><Link to="#">Meettify ID 관리</Link></li>
                            <li className="text-base"><Link to="#">Meettify 계정 정보</Link></li>
                            <li className="text-base"><Link to="#">Meettify.store</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="quick-img-btns">
                    <Link to="#" className='img-link img-link-return'>
                        <span className='button-name'>반품하기<span class="icon-allow"><BsChevronRight /></span></span>
                        <img className='img-link-bg bg-return' src={imgLinkReturn} alt="" />
                    </Link>
                    <Link to="#" className='img-link img-link-product'>
                        <span className='button-name'>상품 등록 신청<span class="icon-allow"><BsChevronRight /></span></span>
                        <img className='img-link-bg bg-register' src={imgLinkRegister} alt="" />
                        <div className='ico-plus ico-plus-right'>
                            <span></span>
                            <span></span>
                        </div>
                        <div className='ico-plus ico-plus-left'>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                </div>
            </div>
            <p className="copyright">&copy; 2024 Meettify. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
