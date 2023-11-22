import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/config';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useFactory: () => typeOrmConfig,
    }),
    NewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
