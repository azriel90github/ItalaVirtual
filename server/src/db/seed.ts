import { client, db } from ".";
import { customerOrder, goods } from "./schema";

async function seed() {
	await db.delete(goods);
	//await db.delete(customerOrder);

	await db.insert(goods).values([
		{
			title: "Morro",
			price: "310", // Agora pode ser um number
			heart: 2,
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Menta"
		},
		{
			title: "Rio de Janeiro",
			price: "320", // Agora pode ser um number
			heart: 3,
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Menta"
		},
		{
			title: "Canada",
			price: "330", // Agora pode ser um number
			heart: 4,
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Chocolate"
		},
		{
			title: "Miami",
			price: "370", // Agora pode ser um number
			heart: 3,
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Chocolate"
		},
		{
			title: "Luxenburgo",
			price: "340", // Agora pode ser um number
			heart: 3,
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Banana"
		},
		{
			title: "Havai",
			price: "380", // Agora pode ser um number
			heart: 3,
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Banana"
		},
		{
			title: "Florianopólis",
			price: "440", // Agora pode ser um number
			heart: 1,
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Água"
		},
		{
			title: "Dubai",
			price: "450", // Agora pode ser um number
			heart: 1,
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Água"
		},
		{
			title: "Angola",
			price: "540", // Agora pode ser um number
			heart: 4,
			description: "Mistura de morango com chocolate, bolachas e uma caneca de café",
			category: "Baunilha"
		},
		{
			title: "Malanje",
			price: "740", // Agora pode ser um number
			heart: 4,
			description: "Mistura de morango com chocolate, bolachas e uma caneca de café",
			category: "Baunilha"
		},
	]);

	/**
	 * await db.insert(customerOrder).values([
		{
			name: "Azriel Armando",
			number: "932101903", // Agora pode ser um number
			flavors: "3",
			payment: "360",
			paymentMethod: "Dinheiro em mão",
			cityOrNeighborhood: "Rocha",
			landmark: "Gamek"
		},
	]);

	 */

}

seed().finally(() => { 
	client.end();
}); 


