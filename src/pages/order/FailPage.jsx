const FailPage = () => {
  const [errorMessage, setErrorMessage] = useState("알 수 없는 오류 발생");
  const { state } = useLocation();  // state 확인

  useEffect(() => {
    if (state?.message) {
      setErrorMessage(state.message);  // 메시지 업데이트
    }
  }, [state]);

  return (
    <div>
      <h1>결제 실패</h1>
      <div>{`사유: ${errorMessage}`}</div>
    </div>
  );
}

export default FailPage;