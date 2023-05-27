import { firebaseConfig } from 'src/docs/appgym-key';
import { bucket } from 'src/main';

export const ImageFirebase = async (file: any) => {
  const filename = file.originalname;

  // Crie um novo arquivo no bucket e obtenha uma referência para ele.
  const fileRef = bucket.file(filename);

  // Crie um stream de gravação para o novo arquivo.
  const writeStream = fileRef.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  // Escreva o buffer no stream e finalize o stream quando terminar.
  writeStream.end(file.buffer);

  // Aguarde o evento 'finish' no stream para garantir que todo o arquivo foi enviado.
  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  // Atualizado para usar seu Firebase Storage bucket
  return `https://firebasestorage.googleapis.com/v0/b/${
    firebaseConfig?.storageBucket
  }/o/${encodeURIComponent(filename)}?alt=media`;
};
