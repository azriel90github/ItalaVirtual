import { client, db } from ".";
import { customerOrder, goods } from "./schema";

// Função para limpar os dados das tabelas
async function clear() {
    await db.delete(goods);
    await db.delete(customerOrder);
    console.log("Dados das tabelas 'goods' e 'customerOrder' foram removidos.");
}

// Função para semear (inserir) os dados
async function seed() {
    // Limpa as tabelas antes de inserir os dados
    await clear();
    await db.insert(goods).values([
		{
				title: "Menta",
				heart: 1,
				price: 310,
				description: "Mistura de morango com chocolate, bolachas e uma cereginha",
				category: "Menta",
		},
		{
				title: "Chocolate",
				heart: 0,
				price: 330,
				description: "Mistura de morango com chocolate, bolachas e uma cereginha",
				category: "Chocolate",
		},
		{
				title: "Banana",
				heart: 1,
				price: 340,
				description: "Mistura de morango com chocolate, bolachas e uma cereginha",
				category: "Banana",
		},
	]);

	await db.insert(customerOrder).values([
		{
				name: "Varstoque Armando",
				number: 930285124,
				paymentMethod: "Dinheiro em mão",
				location: "Samba, Luanda", 
				createdAt: new Date(),
		},
		{
				name: "Cunha Chombossi",
				number: 930882670,
				paymentMethod: "Transferência bancária",
				location: "Samba, Luanda", 
				createdAt: new Date(),
		},
		{
				name: "Isabel Tatiana",
				number: 939765411,
				paymentMethod: "TPA (presencial)",
				location: "Samba, Luanda", 
				createdAt: new Date(),
		}
	]);

	console.log("Dados inseridos com sucesso nas tabelas 'goods' e 'customerOrder'.");
}

// Executa a função seed e encerra a conexão
seed().finally(() => { 
  client.end();
});


