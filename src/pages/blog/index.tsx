import { ArrowLeft, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

export function BlogPage() {

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

          <div className="w-40 flex items-center justify-between">
            <div>
              <ArrowLeft className="size-6" />
            </div>
            <p>
              Sobre nós
            </p>
          </div>
          <div className="flex items-center justify-between">
            {/*Social*/}
            <div className="flex gap-1.5">
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#">
                <Facebook className="size-7" />
              </a>
              <Instagram className="size-7" />
              <Twitter className="size-7" />
              <Youtube className="size-7" />

            </div>
          </div>

        </div>


        <div>
          <div>
            <img className="size-cover h-full w-full bg-cover bg-center" src="/banner2.jpg" alt="" />
          </div>
        </div>




        {/* Rodapé que aparece após rolagem */}
			 <footer
					className={`flex h-20 items-center justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-colorInput bg-searchColor ${
						isScrolled ? 'translate-y-0' : 'translate-y-full'
					}`}
				> 

				<div className="flex gap-4 items-center">
					
				
					<div className="w-px h-12 bg-buttonColor2">

					</div>
					
				</div>
				</footer>
    </div>
  );
}











