import { ShoppingCart, SquareChartGantt } from "lucide-react";

export function App() {
	/*const [count, setCount] = useState(0)*/
	return (
		<div className="h-screen flex items-center justify-center bg-fundoHome fundo bg-no-repeat bg-center opacity-35">
			<div className="max-w-3xl w-full px-6 text-center space-y-10">
				<p className="text-zinc-300 text-lg">
					Faça sua encomenda de qualquer lugar e a qualquer hora!
				</p>

				<div className="h-10 px-4 flex items-center justify-evenly">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="flex justify-between w-60 bg-colorButton px-6 py-3 rounded-3xl shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium">
            Cárdapio

            {/*
              <div className="w-px h-6 bg-zinc-800">

              </div>
            */}
  
            <SquareChartGantt />
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="flex justify-between w-60 bg-colorButton px-6 py-3 rounded-3xl shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium">
            Carrinho
            <ShoppingCart />
          </button>
        </div>

				<p className="text-sm text-colorText1">
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

