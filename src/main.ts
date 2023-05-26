import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebase from 'firebase-admin';
import { firebaseConfig, keyFirebase } from './docs/appgym-key';

async function bootstrap() {
  const initialize = () => {
    firebase.initializeApp({
      credential: firebase.credential.cert({
        privateKey: keyFirebase.private_key,
        clientEmail: keyFirebase.client_email,
        projectId: keyFirebase.project_id,
      }),
      storageBucket: firebaseConfig.storageBucket, // Aqui está o storageBucket correto
    });
  };

  initialize();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
    },
  });
  await app.listen(process.env.PORT || 3005);
}
bootstrap();

export const bucket = firebase.storage().bucket();
