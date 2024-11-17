import { client, db } from ".";
import { customerOrder, goods } from "./schema";

async function seed() {
	await db.delete(goods);
	//await db.delete(customerOrder);

	await db.insert(goods).values([
		{
			title: "Menta",
			heart: 1,
			price: 310, // Agora pode ser um number
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Menta",
		},
		{
			title: "Chocolate",
			heart: 0,
			price: 330, // Agora pode ser um number
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Chocolate",
		},
		{
			title: "Banana",
			heart: 1,
			price: 340, // Agora pode ser um number
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Banana",
		},
		{
			title: "Água",
			heart: 1,
			price: 440, // Agora pode ser um number
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Água",
		},
	]);

  
}

seed().finally(() => { 
	client.end();
}); 


