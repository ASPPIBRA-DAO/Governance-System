const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// As credenciais agora são lidas de forma segura a partir das variáveis de ambiente
const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const uploadFileToR2 = async (file) => {
  const key = `${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME, // Usando a variável de ambiente para o nome do bucket
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  });

  await s3Client.send(command);

  // A URL pública é construída usando o endpoint para garantir que esteja sempre correta.
  // Nota: Certifique-se de que seu bucket R2 está configurado para ser acessível publicamente.
  const fileUrl = `${process.env.R2_ENDPOINT}/${key}`;
  return fileUrl;
};

module.exports = { uploadFileToR2 };