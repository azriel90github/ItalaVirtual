import { Headset } from "lucide-react";
import { useState } from "react";

export function ContactModal() {

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  function openProfileModal() {
    setIsContactModalOpen(true);
  }

  function closeProfileModal() {
    setIsContactModalOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openContactModal}
        
      >
        <Headset />
      </button>
      <div>
        {isContactModalOpen && (
          <div onClick={closeProfileModal} className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-3xl py-5 px-6 bg-colorFundo">
            <div className="flex items-center justify-between text-buttonColor font-medium text-xl">
              Conta Google
              <X className="size-6 cursor-pointer" />
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
}