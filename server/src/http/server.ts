import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3334;

// Configuração do CORS para permitir requisições do front-end
app.use(cors({ origin: 'http://localhost:5173' })); // Altere para a URL correta do seu front-end
app.use(express.json()); // Middleware para interpretar JSON no corpo das requisições

// Endpoint para receber dados da encomenda
app.post('/order', (req: Request, res: Response) => {
  const { name, number, paymentMethod, cityOrNeighborhood, landmark } = req.body;

  // Remova o campo payment se ele estiver presente
  const orderData = {
    name,
    number,
    paymentMethod,
    cityOrNeighborhood,
    landmark
  };

  // Lógica para salvar ou processar a encomenda
  console.log("Dados recebidos:", orderData);

  // Envia uma resposta de sucesso ao cliente
  res.status(200).json({ message: 'Encomenda recebida com sucesso!', orderData });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

