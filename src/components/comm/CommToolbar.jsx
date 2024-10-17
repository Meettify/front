// Custom Toolbar 컴포넌트 정의 (링크 버튼 제거)
const CommToolbar = ({ handleFileInputClick }) => (
    <div id="toolbar">
        {/* 기본적인 툴바 옵션들 */}
        <select className="ql-header" defaultValue="">
            <option value="1"></option>
            <option value="2"></option>
            <option value=""></option>
        </select>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>

        {/* 파일 선택 아이콘 버튼 */}
        <button className="ql-file" onClick={handleFileInputClick}>
            <GoFileMedia size={20} />
        </button>
    </div>
);

export default CommToolbar;