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
        href="https://azriel90github.github.io/Portofolio-perfil/" target="_blank"  rel="noreferrer"
        className="text-buttonColor font-medium text-lg bg-searchColor w-80 flex justify-between items-center gap-2 px-2.5 py-2.5 rounded-full"
      >
        <div className="bg-colorFundo w-full py-2.5 flex items-center justify-center rounded-full">Programador</div>
        <div>
          <UserRoundCog className="size-7 mr-6 ml-2" />
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