import React from "react";
import RoundedButton from "../button/RoundedButton";
import logo from "../../assets/logo/meettify_logo.svg";
import "./Footer.css";
import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import imgLinkReturn from "../../assets/images/img-link-return.png";
import imgLinkRegister from "../../assets/images/img-link-register.png";
import Modal from "./Modal";
import { modalContents } from "./ModalRuleContents";
import { useState } from "react";

const Footer = () => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const handleOpenModal = (key) => {
    const { title, content } = modalContents[key];
    setModalData({ isOpen: true, title, content });
  };

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  return (
    <footer>
      <div className="logo-wrap">
        <img src={logo} alt="Meettify Logo" className="logo" />
      </div>
      <div className="footer-content-area">
        <div className="footer-link-area">
          <div className="footer-link footer-link-shop">
            <ul>
              <li
                className="text-base"
                onClick={() => handleOpenModal("termsOfUse")}
              >
                모임 이용 약관
              </li>
              <li
                className="text-base"
                onClick={() => handleOpenModal("privacyPolicy")}
              >
                개인정보처리방침
              </li>
              <li
                className="text-base"
                onClick={() => handleOpenModal("refundPolicy")}
              >
                환불 정책
              </li>
              <li
                className="text-base"
                onClick={() => handleOpenModal("shopTerms")}
              >
                쇼핑 이용 약관
              </li>
            </ul>
          </div>
          <div className="footer-link footer-link-account">
            <ul>
              <li
                className="text-base"
                onClick={() => handleOpenModal("about")}
              >
                Meettify 소개
              </li>
              <li className="text-base">
                <a href="mailto:zxzz5025@gmail.com?subject=Meettify%20문의사항&body=안녕하세요.%20문의사항을%20아래에%20작성해주세요.%0D%0A">
                  메일 보내기
                </a>
              </li>
              <li className="text-base">
                <Link to="/mypage/editProfile">계정 정보</Link>
              </li>
              <li className="text-base">
                <Link to="/support">자주 묻는 질문(FAQ)</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="quick-img-btns">
          <Link to="/my-questions" className="img-link img-link-return">
            <span className="button-name">
              나의 문의 목록 확인
              <span className="icon-allow">
                <BsChevronRight />
              </span>
            </span>
            <img className="img-link-bg bg-return" src={imgLinkReturn} alt="" />
          </Link>
          <Link to="/mypage/orderList" className="img-link img-link-product">
            <span className="button-name">
              주문 내역 확인
              <span className="icon-allow">
                <BsChevronRight />
              </span>
            </span>
            <img
              className="img-link-bg bg-register"
              src={imgLinkRegister}
              alt=""
            />
            <div className="ico-plus ico-plus-right">
              <span></span>
              <span></span>
            </div>
            <div className="ico-plus ico-plus-left">
              <span></span>
              <span></span>
            </div>
          </Link>
        </div>
      </div>
      <p className="copyright">&copy; 2024 Meettify. All rights reserved.</p>
      {/* 모달 렌더링 */}
      <Modal
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
        title={modalData.title}
        content={modalData.content}
      />
    </footer>
  );
};

export default Footer;
