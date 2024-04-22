import './env';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RootModule } from './root.module';

const main = async () => {
  const app = await NestFactory.create(RootModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Touchpoint Items Service')
    .setDescription('experience api gateway')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { APPLICATION_API_PORT } = process.env;
  await app.listen(+APPLICATION_API_PORT || 3008);
};

main();
