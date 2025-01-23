import { UserRoundCog, X } from "lucide-react";
import { useState } from "react";

export function ProfileModal() {
  /**
   *   function disableScroll() {
    document.body.style.overflow = "hidden";
  }
   */
  
  function enableScroll() {
    document.body.style.overflow = "";
  }

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  /**
   *   function openProfileModal() {
    setIsProfileModalOpen(true);
    disableScroll(); // Bloqueia rolagem ao abrir
  }
   */


  function closeProfileModal() {
    setIsProfileModalOpen(false);
    enableScroll(); // Desbloqueia rolagem ao fechar
  }

  return (
    <>
      <a
        href="https://portofolio-perfil.vercel.app/" target="_blank"  rel="noreferrer"
        className="flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-100 shadow-shape bg-buttonColor transition duration-400 text-zinc-100 rounded-2xl px-7 py-3.5"
      >
        <div>Programador</div>
        <div>
          <UserRoundCog />
        </div>
      </a>
      <div>
        {isProfileModalOpen && (
          <div  className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-2xl py-5 px-6 bg-colorFundo">
              <div className="flex items-center justify-between text-buttonColor font-medium text-xl">
                Entrar com membro da empresa
                <X onClick={closeProfileModal} className="size-6 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}