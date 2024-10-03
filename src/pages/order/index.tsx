import { ShoppingCart, SquareChartGantt } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OrderPage() {

	/*const [count, setCount] = useState(0)*/

  const navigate = useNavigate()

  function menuPage() {
    navigate("/menu/123");
	}
	return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-3 h-20 rounded-3xl shadow-shape bg-headerColor text-buttonColor flex items-center justify-between font-medium text-xl">
        <div className="flex items-center px-3">
          <ShoppingCart className="size-8" />
          <p className="px-4 text-2xl font-semibold" >Carrinho de Compras</p>
        </div>

        <div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={menuPage} className="flex items-center justify-between w-72 hover:bg-colorHover shadow-shape bg-buttonColor2 transition duration-400 text-zinc-100 hover:text-zinc-100 rounded-2xl px-7 py-3.5">
            Cardápio
            <SquareChartGantt  />
            
          </button>
        </div>
      </div>

      <div className="flex items-center justify-around">
        {/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}

      </div>

      <main className="flex gap-16">

        <div className="w-80 bg-headerColor py-3.5 px-3.5 rounded-3xl" >
          <h2 className="flex justify-between py-1 px-2 text-lg">
            Detalhes da Encomenda
          </h2>

          <p className="flex justify-between py-1 px-2">
            <h3 className="text-buttonColor font-medium">Sabores</h3>
            <span className="text-buttonColor">
              3
            </span>
          </p>

          <p className="flex justify-between py-1 px-2">
            <h3 className="text-buttonColor font-medium">Pagamento</h3>
            <span className="text-buttonColor">
              6.500 kz           
            </span>
          </p>

          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={menuPage} className="flex mt-3 bg-buttonColor2 hover:bg-colorHover text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
            Adicionar Sabores
            <SquareChartGantt  />
          </button>
        </div>

        <div className="flex-1">
          <h1>
            Encomendar Agora
          </h1>
        </div> 



      </main>

    </div>
	);
}