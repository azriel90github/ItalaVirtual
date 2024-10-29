import { Images, X } from "lucide-react";
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
        <div>Galeria</div>
        <div>
          <Images />
        </div>
      </button>
      <div>
        {isGalleryModalOpen && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div onClick={closeGalleryModal} className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-2xl py-5 px-6 bg-colorFundo">
              <div className="flex items-center justify-between text-buttonColor font-medium text-xl">
                Galeria
                <X className="size-6 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}