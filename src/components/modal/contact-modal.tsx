import { Headset, X } from "lucide-react";
import { useState } from "react";

export function ContactModal() {

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  function openContactModal() {
    setIsContactModalOpen(true);
  }

  function closeContactModal() {
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
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div onClick={closeContactModal} className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-2xl py-5 px-6 bg-colorFundo">
            <div className="flex items-center justify-between text-buttonColor font-medium text-xl">
              Apoio ao Cliente
              <X className="size-6 cursor-pointer" />
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
}