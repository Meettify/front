import React, { useState } from "react";
import EditProfileForm from '../../../components/member/info/EditProfileForm';
import MyInfoSidebar from "../../../components/member/info/MyInfoSidebar";

const MyInfoPage = () => {

    const [currentForm, setCurrentForm] = useState('editProfile');

    const handleFormChange = (formType) => {
        setCurrentForm(formType);
    };

    const renderForm = () => {
        switch (currentForm) {
            case 'editProfile':
                return <EditProfileForm />;
            case 'deleteAccount':
                return <div>회원 탈퇴 폼</div>; // 추후 구현할 폼
            default:
                return (
                    <EditProfileForm />
                );
        }
    };

    return (
        <div className="flex mt-5">
            <div className="w-[300px] h-[800px] bg-gray-100 p-5">
                <MyInfoSidebar 
                    onChangeForm={handleFormChange} 
                />
            </div>

            <div className="flex-1 p-6">
                {renderForm()}
            </div>
        </div>
    );
};

export default MyInfoPage;
