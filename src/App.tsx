export function App() {
	/*const [count, setCount] = useState(0)*/
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="max-w-3xl w-full px-6 text-center space-y-10">
				<p className="text-zinc-300 text-lg">
					Faça sua encomenda de qualquer lugar e a qualquer hora!
				</p>

				<div className="h-10 px-4 flex items-center justify-evenly">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="bg-colorButton px-6 py-3 rounded-3xl">
            Cárdapio
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="bg-colorButton px-6 py-3 rounded-3xl">
            Carrinho
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

