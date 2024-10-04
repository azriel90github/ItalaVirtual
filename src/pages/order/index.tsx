import { SquareChartGantt, Trash2 } from "lucide-react";
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
          <p className="pl-2 text-2xl font-normal" >Carrinho de Compras</p>
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
          <h2 className="flex justify-between py-2 px-3 text-xl font-medium">
            Detalhes da Encomenda
          </h2>

          <p className="flex justify-between pt-2 px-3 text-xl">
            <h3 className="text-buttonColor font-medium">Sabores</h3>
            <span className="text-moneyColor">
              3
            </span>
          </p>

          <p className="flex justify-between py-2 px-3 text-xl">
            <h3 className="text-buttonColor font-medium">Pagamento</h3>
            <span className="text-moneyColor">
              6.500         
            </span>
          </p>

          <div className="flex flex-col gap-3">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={menuPage} className="flex mt-6 bg-buttonColor2 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
              Adicionar Sabores
              <SquareChartGantt  />
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="flex bg-buttonColor2 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
              Remover Sabores
              <Trash2 />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl flex items-center font-medium text-headerColor">
            Encomendar - Agora
          </h1>
          {/** 
             *<form action="#">
                <label htmlFor="nome">Nome</label> <br />
                <input type="text" />
              </form>
          */}
        </div> 
      </main>
    </div>
	);
}