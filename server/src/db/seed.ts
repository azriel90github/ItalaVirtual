import { client, db } from ".";
import { customerOrder, goods } from "./schema";

async function seed() {
	await db.delete(goods);
	await db.delete(customerOrder);

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
	]);

  await db.insert(customerOrder).values([
		{
			name: "Varstoque Armando",
			number: 930285124,
			location: "Samba, Luanda", 
			paymentMethod: 
			createdAt: new Date(),
		},
    {
			name: "Cunha Chombossi",
			number: 930882670,
			location: "Samba, Luanda", 
			createdAt: new Date(),
		},
    {
			name: "Isabel Tatiana",
			number: 939765411,
			location: "Samba, Luanda", 
			createdAt: new Date(),
		}
	]);
}

seed().finally(() => {
	client.end();
});