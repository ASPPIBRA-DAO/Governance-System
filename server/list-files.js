
// Importa o necessário do SDK da AWS e carrega as variáveis de ambiente
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
require('dotenv').config();

// Configura o cliente S3 para se conectar ao R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Função para listar os arquivos
const listFiles = async () => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
  });

  try {
    const { Contents } = await s3Client.send(command);
    // Se o bucket estiver vazio, informa no console
    if (!Contents) {
      console.log("O bucket está vazio.");
      return;
    }
    // Monta a URL pública de cada arquivo e a imprime
    const publicUrlBase = process.env.R2_PUBLIC_URL;
    const fileUrls = Contents.map(file => `${publicUrlBase}/${file.Key}`);
    console.log(fileUrls.join('\n'));
  } catch (err) {
    console.error("Erro ao listar os arquivos:", err);
  }
};

// Executa a função
listFiles();
