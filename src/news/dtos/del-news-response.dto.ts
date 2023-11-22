import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DelNewsResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
