import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RidersService {
  constructor(private prisma: PrismaService) {}

  getRiders() {
    return this.prisma.rider.findMany({ include: { riderPosition: true } });
  }
  getRiderById(id: number) {
    return this.prisma.rider.findUnique({
      where: { id },
      include: {
        riderPosition: true,
      },
    });
  }
  createRider(
    data: Prisma.RiderCreateInput,
    latitude: number,
    longtitude: number,
  ) {
    return this.prisma.rider.create({
      data: {
        ...data,
        riderPosition: (latitude !== undefined && longtitude !== undefined) ? {
            create: {
                latitude , 
                longtitude,
            },
        } : undefined
      },
    });
  }
  async updateRiderById(id: number , data: Prisma.RiderUpdateInput) {
    const findRider = await this.getRiderById(id);
    if(!findRider) {
        throw new HttpException('Rider Not Found' , 404);
    }
    return await this.prisma.rider.update({where : {id} , data});
  }
  async deleteRiderById(id: number) {
    const findRider = await this.getRiderById(id);
    if (!findRider) {
        throw new HttpException('Rider not found', 404);
    } 
    // delete riderPosition first
    await this.prisma.riderPosition.delete({where: {id : findRider.riderPosition?.id}});
    return this.prisma.rider.delete({ where: { id } });
  }
}
