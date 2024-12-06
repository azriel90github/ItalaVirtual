import { client, db } from ".";
import { customerOrder, goods } from "./schema";

async function seed() {
	await db.delete(goods);
	//await db.delete(customerOrder);

	await db.insert(goods).values([
		{
			title: "Menta",
			price: "310", // Agora pode ser um number
			heart: "2",
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Gelados"
		},
		{
			title: "Chocolate",
			price: "330", // Agora pode ser um number
			heart: "4",
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Chocolate"
		},
		{
			title: "Banana",
			price: "340", // Agora pode ser um number
			heart: "3",
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Banana"
		},
		{
			title: "Água",
			price: "440", // Agora pode ser um number
			heart: "1",
			description: "Mistura de morango com chocolate, bolachas e uma cereginha",
			category: "Água"
		},
		{
			title: "Baunilha",
			price: "540", // Agora pode ser um number
			heart: "4",
			description: "Mistura de morango com chocolate, bolachas e uma caneca de café",
			category: "Baunilha"
		},
	]);

  
}

seed().finally(() => { 
	client.end();
}); 


