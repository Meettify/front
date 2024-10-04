const MeetChatRoom = () => {
    return (
      <div className="flex-none w-3/4"> {/* ChatRoom: 3/4 */}
        <div className="container mx-auto shadow-lg rounded-lg">
            {/*<!-- Chatting -->*/}
            <div className="flex flex-row justify-between bg-white">
              {/*<!-- message -->*/}
              <div className="w-full px-5 flex flex-col justify-between">
                <div className="flex flex-col mt-5">
                  <div className="flex justify-end mb-4">
                    <div 
                      className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                      Welcome to group everyone !
                    </div>
                  </div>
                  <div className="flex justify-start mb-4">
                    <p>username</p>
                    <div
                      className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                      at praesentium, aut ullam delectus odio error sit rem. Architecto
                      nulla doloribus laborum illo rem enim dolor odio saepe,
                      consequatur quas?
                    </div>
                  </div>
                  <div className="flex justify-end mb-4">
                    <div>
                      <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                      >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Magnam, repudiandae.
                      </div>
        
                      <div
                        className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis, reiciendis!
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start mb-4">
                    <p>username</p>
                    <div
                      className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                      happy holiday guys!
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <input
                    className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                  />
                </div>
              </div>
              {/*<!-- end message -->*/}
            </div>
        </div>
      </div>
    );
};
export default MeetChatRoom;