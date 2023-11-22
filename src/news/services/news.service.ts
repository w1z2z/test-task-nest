import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from '../entities/news.entity';
import {
  AddNewsRequestDto,
  NewsResponseDto,
  UpdateNewsRequestDto,
  FullNewsResponseDto, DelNewsResponseDto
} from "../dtos";
import { User } from '../../auth/entities/user.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllNews(): Promise<NewsResponseDto[] | []> {
    const newsList = await this.newsRepository.find({ relations: ['author'] });

    return newsList.map((news) => {
      return {
        id: news.id,
        title: news.title,
      };
    });
  }

  async getNewsById(id: number): Promise<FullNewsResponseDto> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!news) {
      throw new HttpException('Новость не найдена', HttpStatus.NOT_FOUND);
    }

    return {
      id: news.id,
      title: news.title,
      content: news.content,
      author: {
        id: news.author.id,
        email: news.author.email,
      },
    };
  }

  async createNews(
    userId: number,
    createNewsDto: AddNewsRequestDto,
  ): Promise<FullNewsResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const newNews = this.newsRepository.create({
      ...createNewsDto,
      author: user,
    });

    await this.newsRepository.save(newNews);

    return {
      id: newNews.id,
      title: newNews.title,
      content: newNews.content,
      author: {
        id: newNews.author.id,
        email: newNews.author.email,
      },
    };
  }

  async deleteNews(id: number, userId: number): Promise<DelNewsResponseDto> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!news) {
      throw new HttpException('Новость не найдена', HttpStatus.NOT_FOUND);
    }

    if (news.author.id !== userId) {
      throw new HttpException(
        'Этот пользователь не является автором',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.newsRepository.delete(id);

    return {
      message: 'Новость удалена!',
    };
  }

  async updateNews(
    id: number,
    updatedNews: UpdateNewsRequestDto,
    userId: number,
  ): Promise<FullNewsResponseDto> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!news) {
      throw new HttpException('Новость не найдена', HttpStatus.NOT_FOUND);
    }

    if (news.author.id !== userId) {
      throw new HttpException(
        'Этот пользователь не является автором',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.newsRepository.update(id, updatedNews);

    const updatedNew = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    return {
      id: updatedNew.id,
      title: updatedNew.title,
      content: updatedNew.content,
      author: {
        id: updatedNew.author.id,
        email: updatedNew.author.email,
      },
    };
  }
}
