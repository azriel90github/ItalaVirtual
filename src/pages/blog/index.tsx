import { ArrowLeft, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "../../components/buttons/menu-button";
import { Language } from "../../components/language";
import { Profile } from "../../components/profile";

export function BlogPage() {

  const navigate = useNavigate() 

  function homePage() {
    navigate('/')
  }

  	// Estado para o sroller
	const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
		const handleScroll = () => {
			// Verifica se o usuário rolou mais de 50px da página
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		// Limpar o event listener quando o componente for desmontado
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
    <div>
      <div className={`border-b-2 border-colorInput h-20 shadow-shape bg-searchColor text-buttonColor flex flex-wrap items-center justify-around font-medium text-xl ${
        isScrolled ? '-translate-y-10' : 'translate-y-0'
				}`}>

          <div className="flex items-center justify-between">
            <div>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="flex items-center gap-3" onClick={homePage}>
                <ArrowLeft className="size-6" />
                <p className="text-2xl font-normal">
                  Inicio
                </p>
              </button>

            </div>

          </div>
          <div className="flex items-center justify-between">
            {/*Social*/}
            <div className="flex gap-2 text-zinc-300">
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#">
                <Facebook className="size-7" />
              </a>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#">
                <Instagram className="size-7" />
              </a>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#">
                <Twitter className="size-7" />
              </a>

              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#">
                <Youtube className="size-7" />
              </a>

            </div>
          </div>

        </div>


        <div>
          <div>
            <img className="size-cover h-full w-full bg-cover bg-center" src="/banner2.jpg" alt="" />
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2">

            <div>
              <div className="w-10/12 leading-loose flex flex-col gap-4 justify-center mx-auto">
                <h1 className="text-5xl text-buttonColor py-2 mt-12 font-normal">Sobre nós</h1>
                <p className="text-lg text-zinc-300">
                  "Olá! Sou o Cunha Shombossi, a mente e o coração por trás da Geladaria Italala.
                  Minha paixão por criar sabores únicos e oferecer momentos doces para as pessoas começou há muitos anos,
                  quando descobri a magia que um simples sorvete pode trazer para o dia de alguém."
                </p>
                <p className="text-lg text-zinc-300">
                  "Na Geladaria Itala, usamos apenas ingredientes frescos e de alta qualidade. Todos os nossos sorvetes são preparados com muito cuidado e amor, para garantir uma explosão de sabores em cada mordida. Valorizamos o processo artesanal, e cada detalhe é pensado para oferecer a melhor experiência aos nossos clientes."
                </p>
                <p className="text-lg text-zinc-300">
                  "Na Italala, você encontrará um ambiente familiar e descontraído, perfeito para saborear um delicioso sorvete em boa companhia. Além dos nossos sabores tradicionais, oferecemos opções veganas e sem lactose, para que todos possam aproveitar essa experiência. Acompanhe nossas redes sociais e fique por dentro das nossas promoções e novidades, Visite-nos ja, ou  faça sua encomenda por aqui!"
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-5xl text-buttonColor py-2 mt-12 font-normal">Depoimentos</h1>
              <figure className="">
                <div>

                </div>
                <div>
                  
                </div>
              </figure>
            </div>


          </div>

        </div>




        {/* Rodapé que aparece após rolagem */}
			 <footer
					className={`flex h-20 items-center flex-wrap justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-colorInput bg-searchColor ${
						isScrolled ? 'translate-y-0' : 'translate-y-full'
					}`}
				> 

        <Profile />

				<div className="flex gap-4">
					
          <MenuButton />
				
					<div className="w-px h-12 bg-buttonColor2">
           
					</div>
          <Language />
					
				</div>
				</footer>
    </div>
  );
}











