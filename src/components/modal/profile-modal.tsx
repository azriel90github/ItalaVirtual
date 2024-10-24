import { UserRound, X } from "lucide-react";
import { useState } from "react";

export function ProfileModal() {

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  function openProfileModal() {
    setIsProfileModalOpen(true);
  }

  function closeProfileModal() {
    setIsProfileModalOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openProfileModal}
        className="flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-100 shadow-shape bg-buttonColor transition duration-400 text-zinc-100 rounded-2xl px-7 py-3.5"
      >
        <div>Iniciar Sessão</div>
        <div>
          <UserRound />
        </div>
      </button>
      <div>
        {isProfileModalOpen && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
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