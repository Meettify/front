const MeetChatList = () => {
    return (
      <div className="flex-none w-1/4"> {/* ChatList: 1/4 */}
        <div className="flex flex-col mt-5 overflow-y-auto">
            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
              <div className="w-full">
                <div className="text-lg font-semibold">Luis1994</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>

            <div className="flex flex-col mt-5 overflow-y-auto">
              <div className="w-full">
                <div className="text-lg font-semibold">Everest Trip 2021</div>
                <span className="text-gray-500">Hi Sam, Welcome</span>
              </div>
            </div>

            <div className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">
              <div className="w-full">
                <div className="text-lg font-semibold">MERN Stack</div>
                <span className="text-gray-500">Lusi : Thanks Everyone</span>
              </div>
            </div>

            <div className="fflex flex-col mt-5 overflow-y-auto">
              <div className="w-full">
                <div className="text-lg font-semibold">Javascript Indonesia</div>
                <span className="text-gray-500">Evan : some one can fix this</span>
              </div>
            </div>

            <div className="flex flex-col mt-5 overflow-y-auto">
              <div className="w-full">
                <div className="text-lg font-semibold">Javascript Indonesia</div>
                <span className="text-gray-500">Evan : some one can fix this</span>
              </div>
            </div>
    
            <div className="flex flex-col mt-5 overflow-y-auto">
              <div className="w-full">
                <div className="text-lg font-semibold">Javascript Indonesia</div>
                <span className="text-gray-500">Evan : some one can fix this</span>
              </div>
            </div>
          </div>
        </div>
    );
};
export default MeetChatList;