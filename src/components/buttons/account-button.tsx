import { UserRoundCheck } from "lucide-react";
import { tv } from "tailwind-variants";


const buttonVariants = tv({
  base: "accountButton border-2 border-colorInput flex items-center justify-between bg-searchColor rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl",

  variants: { 
    variant: {
      primary: "px-8 py-4 w-80",
      secundary: "px-7 py-3.5 w-72",
    }
  },
})

export function AccountButton() {
  return (
    <button type="button" className={buttonVariants( {variant: 'primary'} )}>
      <p className="text-1xl font-normal">Conta</p>
      {/*
      <div className="w-px h-6 bg-zinc-800">
      </div>
      */}
      <UserRoundCheck className="size-6" />
    </button>
  );
}