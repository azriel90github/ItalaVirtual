import { db } from "../db";
import { goods } from "../db/schema";

interface CreateGoodsRequests {
  heart: number;
}

// Função para buscar os produtos com seus valores de "hearts"
export const getProductsWithHearts = async () => {
  try {
    // Seleciona todos os produtos e seus valores de hearts
    const products = await db.select({
      id: goods.id,
      title: goods.title,
      hearts: goods.heart, // Supondo que 'hearts' é a coluna que armazena o número de likes/estrelas
      price: goods.price,   // Inclua outras colunas que precisar
    }).from(goods);

    // Log para depuração
    console.log("Produtos com hearts:", products);

    // Retorna os produtos
    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos com hearts:", error);
    throw new Error("Erro ao buscar produtos");
  }
};
