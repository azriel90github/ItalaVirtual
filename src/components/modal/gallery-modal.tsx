import { t } from "i18next";
import { Handshake, X } from "lucide-react";
import { useState } from "react";

export function GalleryModal() {

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  function openGalleryModal() {
    setIsGalleryModalOpen(true);
  }

  function closeGalleryModal() {
    setIsGalleryModalOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openGalleryModal}
        className="flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-100 shadow-shape bg-buttonColor transition duration-400 text-zinc-100 rounded-2xl px-7 py-3.5"
      >
        <div>{t('homepage.gallery')}</div>
        <div>
          <Handshake />
        </div>
      </button>
      <div>
        {isGalleryModalOpen && (
          <div  className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-full h-full py-5 px-6 bg-colorFundo">
              <div className="flex items-center justify-between text-zinc-200 font-normal text-2xl">
                {t('modal.modalTerms.title')}
                
              </div>
              <div className="flex">
                <button type="button">
                  <X onClick={closeGalleryModal} className="size-6 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}