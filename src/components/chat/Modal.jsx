// // components/chat/Modal.jsx
// function Modal({ place, onClose, onShare }) {
//   if (!place) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex justify-end">
//       {/* 사이드 슬라이드 패널 */}
//       <div className="w-[380px] h-full bg-white shadow-xl transform translate-x-0 transition-transform z-50 p-6 relative">
//         {/* 닫기 버튼 */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-2xl hover:text-gray-600"
//         >
//           ✖
//         </button>

//         {/* 콘텐츠 */}
//         <div className="mt-12 flex flex-col gap-4">
//           {/* 장소명 */}
//           <h2 className="text-xl font-bold">{place.title}</h2>
//           {/* 주소 */}
//           <p className="text-gray-600 text-sm">{place.address}</p>

//           {/* 지도 미리보기 */}
//           <div className="w-full h-[180px] bg-gray-100 border rounded flex items-center justify-center overflow-hidden">
//             <img
//               src={`https://dapi.kakao.com/v2/maps/staticmap?appkey=${
//                 import.meta.env.VITE_KAKAO_API_KEY
//               }&center=${place.lng},${place.lat}&level=3&size=380x180`}
//               alt="지도 미리보기"
//               className="object-cover w-full h-full"
//               onError={(e) => {
//                 e.target.src = "/fallback-map.png";
//               }}
//             />
//           </div>

//           {/* 공유하기 버튼 */}
//           <button
//             onClick={() => {
//               onShare(place);
//               onClose();
//             }}
//             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center text-lg w-full"
//           >
//             📍 공유하기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;
