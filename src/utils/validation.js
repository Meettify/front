// 이름 유효성 검사
export const validateName = (name) => {
  const isValid = /^[a-zA-Z가-힣]+$/.test(name); // 한글, 영문(대소문자)만 포함되어 있는지 확인
  return { isValid };
};

// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  const lengthValid = password.length >= 8 && password.length <= 16;
  const numberValid = /\d/.test(password); // 숫자가 포함되어 있는지 확인

  return {
    length: lengthValid,
    number: numberValid,
  };
};

// 닉네임 유효성 검사
export const validateNickname = (nickname) => {
  const lengthValid = nickname.length >= 6 && nickname.length <= 12;
  const isValid = /^[a-zA-Z0-9가-힣]+$/.test(nickname); // 한글, 영문(대소문자), 숫자만 포함되어 있는지 확인

  return {
    length: lengthValid,
    isValid: isValid,
  };
};
