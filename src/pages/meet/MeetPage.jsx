import React from "react";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import MeetCategory from "../../components/meet/MeetCategory";

const MeetPage = () => {

    return (
        <div className="container mx-auto mt-20 w-full flex">
            <div className="w-2/3 bg-gray-100 flex flex-wrap justify-center p-2">
                <MeetCategory/>
            </div>
            <div className="w-1/3">
                <MeetSideMenu />
            </div>
        </div>
    );
};

export default MeetPage;