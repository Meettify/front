import React from "react";
import MeetSideMenu from "../../components/meet/MeetSideMenu";

const MeetPage = () => {
    return (
        <div className="flex h-screen">
            <main className="bg-gray-100 flex-1 h-full">
                <div>모임</div>
            </main>

            <aside className="bg-gray-200 w-1/3 h-full">
                <MeetSideMenu />
            </aside>
        </div>
    );
};

export default MeetPage;