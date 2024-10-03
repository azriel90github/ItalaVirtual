import { Heart, Search, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MenuPage() {
	/*const [count, setCount] = useState(0)*/

  const navigate = useNavigate()
  
  function orderPage() {
		navigate('/order/123')
	}

	return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-3 h-20 rounded-3xl shadow-shape bg-headerColor text-buttonColor flex items-center justify-between font-medium text-xl">
        <div className="flex items-center px-3 ">
          <p className="pl-2 text-2xl font-normal" >Sabores Disponíveis</p>
        </div>

        <div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={orderPage} className="flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-100 shadow-shape bg-buttonColor2 transition duration-400 text-zinc-100 rounded-2xl px-7 py-3.5">
            Carrinho
            <ShoppingCart />
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


      <div className="bg-headerColor rounded-3xl py-6 px-6 w-80">

        <div className="flex items-center justify-between">
          <p>Morango</p>
          <Heart />
        </div>

        <div className="">
          <img className="mx-auto w-14 flex" src="/ice-cream 6.png" alt="gelado" />
        </div>

        <span>
          2.000 AOA (kz) <br />
          (1 Canudo)
        </span>

        <div className="flex">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>

        <p>
          Mistura de morango com chocolate, bolachas e uma cereginha
        </p>

        <div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button>
            <div>Quantia 0</div>
            <div>
              
            </div>
          </button>

          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button>
            Adicionar Carrinho
          </button>
        </div>

      </div>

    </div>
	);
}

