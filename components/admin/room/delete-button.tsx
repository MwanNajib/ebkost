"use client";

import { useTransition, useState } from "react";
import { IoTrashOutline, IoWarningOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { deleteRoom } from "@/lib/actions/room.action";

export default function DeleteRoomButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deleteRoom(id);
      if (result?.success) {
        setShowModal(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="hover:text-red-500 transition-colors"
        title="Hapus Kamar"
      >
        <IoTrashOutline className="size-5" />
      </button>

      {/* Konfirmasi Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in zoom-in slide-in-from-bottom-5 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="size-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <IoWarningOutline size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Kamar?</h3>
              <p className="text-sm text-gray-600 mb-6">
                Data kamar yang telah dihapus tidak dapat dipulihkan kembali. Anda yakin melanjutkan?
              </p>
              
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isPending}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isPending}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                  {isPending ? "Memproses..." : "Ya, Hapus!"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sukses Notifikasi (Toast / Popup) */}
      {showSuccess && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-lg animate-in slide-in-from-top-10 duration-300">
          <IoCheckmarkCircleOutline size={24} />
          <span className="font-semibold text-sm">Aksi Hapus Berhasil Dilakukan!</span>
        </div>
      )}
    </>
  );
}
