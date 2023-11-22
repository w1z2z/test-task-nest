import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';

import { NewsService } from '../services/news.service';
import {
  AddNewsRequestDto,
  UpdateNewsRequestDto,
  NewsResponseDto,
  FullNewsResponseDto,
  DelNewsResponseDto,
} from '../dtos';
import { JwtAuthGuard } from '../../auth/guards/user.guard';
import { User } from '../../auth/entities/user.entity';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Получить все новости' })
  @ApiOkResponse({
    type: [NewsResponseDto],
    description: 'Список всех новостей',
  })
  @Get()
  async getAllNews(): Promise<NewsResponseDto[] | []> {
    return await this.newsService.getAllNews();
  }

  @ApiOperation({ summary: 'Получить новость по ID' })
  @ApiOkResponse({
    type: FullNewsResponseDto,
    description: 'Данные новости',
  })
  @Get(':id')
  async getNewsById(@Param('id') id: number): Promise<FullNewsResponseDto> {
    return await this.newsService.getNewsById(id);
  }

  @ApiOperation({ summary: 'Создать новость' })
  @ApiCreatedResponse({
    type: FullNewsResponseDto,
    description: 'Новая новость',
  })
  @ApiBody({ type: AddNewsRequestDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createNews(
    @Body() createNewsDto: AddNewsRequestDto,
    @Req() req: Request & { user: User },
  ): Promise<FullNewsResponseDto> {
    return await this.newsService.createNews(req.user.id, createNewsDto);
  }

  @ApiOperation({ summary: 'Обновить новость по ID' })
  @ApiOkResponse({
    type: FullNewsResponseDto,
    description: 'Обновленная новость',
  })
  @ApiBody({ type: UpdateNewsRequestDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateNews(
    @Param('id') id: number,
    @Body() updateNewsDto: UpdateNewsRequestDto,
    @Req() req: Request & { user: User },
  ): Promise<FullNewsResponseDto> {
    return await this.newsService.updateNews(id, updateNewsDto, req.user.id);
  }

  @ApiOperation({ summary: 'Удалить новость по ID' })
  @ApiOkResponse({
    type: DelNewsResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNews(
    @Param('id') id: number,
    @Req() req: Request & { user: User },
  ): Promise<DelNewsResponseDto> {
    return await this.newsService.deleteNews(id, req.user.id);
  }
}
