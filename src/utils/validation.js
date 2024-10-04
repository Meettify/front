// 이름 유효성 검사
export const validateName = (name) => {
  const isValid = /^[가-힣]{2,}$/.test(name); // 2글자 이상 한글만 포함되어 있는지 확인
  return { isValid };
};


// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  // 길이 검사
  const lengthValid = password.length >= 6 && password.length <= 15;

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
  const isValid = /^[a-zA-Z0-9가-힣]{5,12}$/.test(nickname); // 한글, 영문(대소문자), 숫자만 포함되어 있는지 확인
  return { isValid };
};


// 이메일 유효성 검사
export const validateEmail = (email) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email); // 이메일 형식 검증
  return { isValid };
};
