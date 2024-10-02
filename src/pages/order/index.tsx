import { Search, ShoppingCart, SquareChartGantt } from "lucide-react";
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
        <div className="flex items-center px-3 ">
          <ShoppingCart />
          <p className="px-3" >Carrinho de Compras</p>
        </div>

        <div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={menuPage} className="flex items-center justify-between w-72 hover:bg-colorHover shadow-shape bg-buttonColor2 transition duration-400 text-zinc-100 rounded-2xl px-7 py-3.5">
            Cardápio
            <SquareChartGantt  />
            
          </button>
        </div>
      </div>

      <div className="flex items-center justify-around">
        {/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}

        <div className="flex items-center bg-searchColor text-buttonColor px-5 py-3 rounded-full w-96 justify-between font-medium text-lg">
          
          <p className="px-3">Pesquisar</p>
          <Search />
        </div>
      </div>
    </div>
	);
}