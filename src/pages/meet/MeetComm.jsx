import React from "react";
import MeetPost from "../../components/meet/MeetPost";
import MeetSideMenu from "../../components/meet/MeetSideMenu";

const MeetComm = () => {
    return (
        <div className="container mx-auto mt-20 w-full flex">
            <MeetPost />
            <MeetSideMenu/>
        </div>
    );
};
export default MeetComm;