import React, { useEffect, useState } from "react";
import axios from "axios";

import ModalAddr from "./ModalAddr";

const SectionAddr = React.memo(() => {
  const [user, setUser] = useState(null);

  const [recipient, setRecipient] = useState(""); //수령자
  const [email, setEmail] = useState(""); //이메일
  const [addr, setAddr] = useState(""); //주소
  const [detailAddr, setDetailAddr] = useState(""); //상세주소

  const [modalAddr, setModalAddr] = useState(false);

  useEffect(() => {
    //로그인 유저 정보 가져오기
    const getUser = async () => {
      const memberId = localStorage.getItem("memberId");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/members/${memberId}`, // URL
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.error(
          "회원 조회 실패 : ",
          err.response ? err.response.data : err
        );
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    setRecipient(user?.memberName);
    setEmail(user?.email);
    setAddr(user?.memberAddr.memberAddr);
    setDetailAddr(user?.memberAddr.memberAddrDetail);
  }, [user]);

  return (
    <>
      <div className="form-group">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name=""
            id=""
            placeholder=" "
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <label htmlFor="">수령자</label>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <input
            className="form-control"
            type="email"
            name=""
            id=""
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">이메일</label>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name=""
            id=""
            placeholder=" "
            value={addr}
            readOnly
          />
          <button class="btn btn-default" onClick={() => setModalAddr(true)}>
            주소변경
          </button>
          <label htmlFor="">주소</label>
        </div>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name=""
            id=""
            placeholder=" "
            value={detailAddr}
            onChange={(e) => setDetailAddr(e.target.value)}
          />
          <label htmlFor="">상세주소</label>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <textarea
            className="form-control"
            name=""
            id=""
            placeholder=" "
          ></textarea>
          <label htmlFor="">배송메모</label>
        </div>
      </div>
      {modalAddr ? (
        <ModalAddr addr={addr} setModalAddr={setModalAddr} setAddr={setAddr} />
      ) : (
        ""
      )}
    </>
  );
});

export default SectionAddr;
