import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import * as admin from 'firebase-admin';

import * as fs from 'fs';
import path from 'path';
import { bucket } from 'src/main';
import { firebaseConfig } from 'src/docs/appgym-key';
import { ImageFirebase } from 'src/Helpers';

export interface PropsCommunity {
  id?: string;
  description: string;
  photoLink?: string | null;
  likes?: number;
  userId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  comments?: any;
}

@Injectable()
export class CommunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(file: any, createCommunityDto: PropsCommunity) {
    const { ...rest } = createCommunityDto;
    let photoURL = '';

    if (file) {
      // Atualizado para usar seu Firebase Storage bucket
      photoURL = await ImageFirebase(file);
    }

    return await this.prisma.community.create({
      data: {
        ...rest,
        photoLink: photoURL,
      },
    });
  }

  async findAll() {
    return await this.prisma.community.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            photoLink: true,
          },
        },
        communityLikes: true, // Inclui os likes recebidos pela comunidade
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const community = await this.prisma.community.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return community;
  }

  async like(request: { id: string; userId: string }) {
    const { id, userId } = request;
    const community = await this.prisma.community.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    // Verifica se o usuário já deu like nessa comunidade
    const existingLike = await this.prisma.like.findFirst({
      where: {
        communityId: community.id,
        userId: userId,
      },
    });

    if (existingLike) {
      // Remove o like existente
      await this.prisma.like.delete({
        where: { id: existingLike.id },
      });

      // Decrementa o número de likes na comunidade
      const updatedCommunity = await this.prisma.community.update({
        where: { id },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });
      updatedCommunity['likedNow'] = false;
      return updatedCommunity;
    }

    // Cria um novo registro no modelo `Like`
    const newLike = await this.prisma.like.create({
      data: {
        user: { connect: { id: userId } },
        community: { connect: { id: community.id } },
      },
    });

    // Incrementa o número de likes na comunidade
    const updatedCommunity = await this.prisma.community.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    updatedCommunity['likedNow'] = true;
    console.log(updatedCommunity);
    return updatedCommunity;
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto) {
    const community = await this.prisma.community.update({
      where: { id },
      data: updateCommunityDto,
    });

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return community;
  }

  async remove(id: string) {
    const community = await this.prisma.community.delete({
      where: { id },
    });

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return community;
  }

  async getComments(id: string) {
    const community = await this.prisma.community.findUnique({
      where: { id },
    });

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return await this.prisma.commentsInCommunity.findMany({
      where: { communityId: id },
    });
  }

  async createComment(id: string, commentDto: any) {
    const community = await this.prisma.community.findUnique({
      where: { id },
    });

    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return await this.prisma.commentsInCommunity.create({
      data: {
        comment: commentDto.comment,
        userId: commentDto.userId,
        communityId: id,
      },
    });
  }
}
