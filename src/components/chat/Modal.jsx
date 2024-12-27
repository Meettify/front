function Modal({ place, onClose, onShare }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <button onClick={onClose} className="absolute top-2 right-2">
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">{place.title}</h2>
        <p className="mb-4">{place.address}</p>
        <button
          onClick={() => {
            onShare(place);
            onClose();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          공유하기
        </button>
      </div>
    </div>
  );
}

export default Modal;
