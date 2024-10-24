import { Headset} from "lucide-react";

export function AccountButtonBlog() {
	return (
		<button
			type="button"
			className="px-7 py-3 w-72 border-2 border-colorInput flex items-center justify-between bg-searchColor rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
		>
			<p className="text-1xl font-normal">Ligar</p>
			{/*
      <div className="w-px h-6 bg-zinc-800">
      </div>
      */}
			<Headset className="size-6" />
		</button>
	);
}