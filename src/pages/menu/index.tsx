import { Heart, Search, ShoppingCart, Star, Trash2 } from "lucide-react";
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


      <div className="bg-headerColor rounded-3xl py-4 px-4 w-80">

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

        <div className="flex flex-col gap-3">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="flex bg-buttonColor2 hover:bg-colorHover text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
            <div>Quantia 0</div>
            <div>
              
            </div>
          </button>

          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="flex bg-buttonColor2 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
            Adicionar Carrinho
            <ShoppingCart />
          </button>

          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="flex bg-buttonColor2 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
            Remover do Carrinho
            <Trash2 />
          </button>
        </div>

      </div>

    </div>
	);
}

