import { client, db } from ".";
import { customerOrder, goods } from "./schema";

async function seed() {
	await db.delete(goods);
	//await db.delete(customerOrder);

	await db.insert(goods).values([
		{
			title: "Menta",
			price: 310, // Agora pode ser um number
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
		},
		{
			title: "Chocolate",
			price: 330, // Agora pode ser um number
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
		},
		{
			title: "Banana",
			price: 340, // Agora pode ser um number
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
		},
		{
			title: "Água",
			price: 440, // Agora pode ser um number
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
		},
	]);

  
}

seed().finally(() => { 
	client.end();
}); 


