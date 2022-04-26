import { Readable } from 'stream';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { InsertImagesDto } from './dto/insert-images.dto';

import { Image } from './image.entity';
import { ImageService } from './image.service';

@Controller('images')
@UseGuards(JwtAuthGuard)
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  @FormDataRequest()
  async insertImages(
    @Body() files: InsertImagesDto,
  ): Promise<Partial<Image>[]> {
    const imagesParams = files.images.map(({ buffer, originalName }) => {
      return {
        buffer,
        imageName: originalName,
      };
    });

    return await this.imageService.insertImages(imagesParams);
  }

  @Get('/:id')
  async getDatabaseFileById(
    @Param('id', ParseUUIDPipe) id: Image['id'],
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const image = await this.imageService.getImageById(id);

    const stream = Readable.from(image.file);

    response.set({
      'Content-Type': 'image',
      'Content-Disposition': `inline; filename="${image.name}"`,
    });

    return new StreamableFile(stream);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.imageService.deleteImageById(id);
  }
}
