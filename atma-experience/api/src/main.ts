import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Application } from './application';

import './env';

const main = async () => {
  const application = await NestFactory.create(Application, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('anatomy.')
    .setDescription('experience api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(application, config);
  SwaggerModule.setup('api', application, document);

  const { APPLICATION_API_PORT } = process.env;
  await application.listen(+APPLICATION_API_PORT || 3008);
};

main();