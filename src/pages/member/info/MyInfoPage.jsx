import React, { useState } from "react";
import EditProfileForm from '../../../components/member/info/EditProfileForm';
import MyInfoSidebar from "../../../components/member/info/MyInfoSidebar";
import DeleteMemberForm from "../../../components/member/info/DeleteMemberForm";

const MyInfoPage = () => {

    const [currentForm, setCurrentForm] = useState('editProfile');

    const handleFormChange = (formType) => {
        setCurrentForm(formType);
    };

    const renderForm = () => {
        switch (currentForm) {
            case 'editProfile':
                return <EditProfileForm />
            case 'deleteMember':
                return <DeleteMemberForm />
            default:
                return (
                    <EditProfileForm />
                );
        }
    };

    return (
        <>
            <br />
            <hr />
            <div className="flex mt-5">
                <div className="w-[250px] h-[800px] bg-gray-100 p-5 ml-2 rounded">
                    <MyInfoSidebar 
                        onChangeForm={handleFormChange} 
                    />
                </div>

                <div className="flex-1 p-6">
                    {renderForm()}
                </div>
            </div>
        </>
        
    );
};

export default MyInfoPage;
