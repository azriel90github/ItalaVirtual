import { Bell, X } from "lucide-react";
import { useState } from "react";

export function NotificationModal() {

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  function openNotificationModal() {
    setIsNotificationModalOpen(true);
  }

  function closeNotificationModal() {
    setIsNotificationModalOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={openNotificationModal}
        className="flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-100 shadow-shape bg-buttonColor transition duration-400 text-zinc-100 rounded-2xl px-7 py-3.5"
      >
				<Bell />
      </button>
      <div>
        {isNotificationModalOpen && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div onClick={closeNotificationModal} className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo">
              <div className="flex items-center justify-between text-buttonColor font-medium text-xl">
                Notificações
                <X className="size-6 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}