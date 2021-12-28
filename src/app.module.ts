import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MyContext } from './utils/interfaces/interfaces';

@Module({
  imports: [
    GraphQLModule.forRoot({
      //-- off in production
      debug: true,
      playground: true,
      //---
      autoSchemaFile: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
      context: ({ req, res }: MyContext) => ({ req, res }),
    }),
    MikroOrmModule.forRoot(),
    JobModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
