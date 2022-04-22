import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Image } from './image.entity';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository,
  ) {}

  async insertImage(buffer: Buffer, imageName: string): Promise<Image> {
    const createdImage = this.imageRepository.create({
      name: imageName,
      file: buffer,
    });

    await this.imageRepository.save(createdImage);
    return createdImage;
  }

  async insertImages(
    files: { buffer: Buffer; imageName: string }[],
  ): Promise<Partial<Image>[]> {
    const filesToInsert = files.map(({ buffer, imageName }) => {
      return { file: buffer, name: imageName };
    });
    const createdImages = this.imageRepository.create(filesToInsert);

    await this.imageRepository.save(createdImages);

    const imagesWithoutBuffer = createdImages.map(({ name, id }) => ({
      name,
      id,
    }));

    return imagesWithoutBuffer;
  }

  async getImageById(id: Image['id']): Promise<Image> {
    const foundImage = await this.imageRepository.findOne(id);

    if (!foundImage)
      throw new NotFoundException(`Image with ID: ${id} does not exist`);

    return foundImage;
  }

  async deleteImageById(id: Image['id']): Promise<void> {
    const deleteResult = await this.imageRepository.delete(id);

    if (!deleteResult.affected)
      throw new NotFoundException(`Image with ID "${id}" does not exist`);
  }
}
