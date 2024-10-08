// 이름 유효성 검사
export const validateName = (name) => {
  const isValid = /^[a-zA-Z가-힣]*$/.test(name); // 한글 영문(대소문자)만 포함되어 있는지 확인
  return { isValid };
};


// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  // 길이 검사
  const lengthValid = password.length >= 8 && password.length <= 20;

  // 알파벳 검사
  const hasAlphabet = /[A-Za-z]/.test(password);

  // 숫자 검사
  const hasNumber = /\d/.test(password);

  // 특수 문자 검사
  const hasSpecialChar = /[~!@#$%^&*()_+=]/.test(password);

  // 모든 조건을 만족하는지 확인 (알파벳, 숫자, 특수 문자가 모두 포함되어 있어야 함)
  const combinationValid = hasAlphabet && hasNumber && hasSpecialChar;

  return {
    length: lengthValid,           // 길이 유효성
    hasAlphabet: hasAlphabet,      // 알파벳 포함 여부
    hasNumber: hasNumber,          // 숫자 포함 여부
    hasSpecialChar: hasSpecialChar, // 특수 문자 포함 여부
    isValid: lengthValid && combinationValid, // 모든 조건이 충족되는지 확인
  };
};


// 닉네임 유효성 검사
export const validateNickname = (nickname) => {
  const isValid = /^[a-zA-Z가-힣]*$/.test(nickname); // 한글, 영문(대소문자)만 포함되어 있는지 확인
  return { isValid };
};


// 이메일 유효성 검사
export const validateEmail = (email) => {
  const isValid = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/.test(email);
  return { isValid };
};
