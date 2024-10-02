import { ShoppingCart, SquareChartGantt } from "lucide-react";

export function HomePage() {
	/*const [count, setCount] = useState(0)*/
	return (
		<div className="h-screen flex items-center justify-center bg-fundoHome fundo bg-no-repeat bg-center">
			<div className="max-w-3xl w-full px-6 text-center space-y-10">
				<div className="flex flex-col items-center gap-4">
					<img className="w-64" src="/logo-geladaria.png" alt="logoItalala" />
					<p className="text-zinc-300 text-xl">
						Faça sua encomenda de qualquer lugar e a qualquer hora!
					</p>
				</div>

				<div className="h-10 px-4 flex items-center justify-between">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="flex items-center justify-between w-80 bg-colorButton px-7 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl">
            Cárdapio

            {/*
              <div className="w-px h-6 bg-zinc-800">

              </div>
            */}
  
            <SquareChartGantt />
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="flex items-center justify-between w-80 bg-colorButton px-7 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl">
            Carrinho
            <ShoppingCart />
          </button>
        </div>

				<p className="text-lg text-colorText1">
					Ao fazer suas encomendas pela itala virtual você automaticamente
					concorda <br /> com nossos{" "}
					{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
					<a className="text-zinc-300" href="#">termos de uso</a> e{" "}
					{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
					<a className="text-zinc-300" href="#">políticas de privacidade</a>.
				</p>
			</div>
		</div>
	);
}

