interface MessageBoxProps {
  isOpen: boolean;
  message: string;
  isSuccess: boolean;
  onClose: () => void;
}

export default function MessageBox({ isOpen, message, isSuccess, onClose }: MessageBoxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-[#1c1c24] border border-[#2d2d3a] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
        <div className="text-6xl mb-4">{isSuccess ? "🎉" : "⚠️"}</div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {isSuccess ? "Thành công!" : "Thông báo"}
        </h3>
        <p className="text-gray-400 mb-8">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-[#2a2a38] hover:bg-[#333342] text-white font-semibold py-3.5 rounded-xl transition-all border border-[#3f3f5a]"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}