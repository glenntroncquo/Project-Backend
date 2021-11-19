import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = 3001
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Pizza Backend Routes')
    // .setDescription('Pizza API')
    .setVersion('1.0')
    // .addTag('pizza')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)

  console.log(`\n👾 Swagger started on port : http://localhost:${port}/api`)
  console.log(`\n👾 Graphql listening on port:  http://localhost:${port}/graphql`)
  console.log(`\n👾 App listening on port:  http://localhost:${port}`)
}
bootstrap()
