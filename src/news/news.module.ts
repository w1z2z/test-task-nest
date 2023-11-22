import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { News } from './entities/news.entity';
import { TokenModule } from '../token/token.module';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, User]), TokenModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
