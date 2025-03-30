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
        riderPosition: {
          create: {
            latitude,
            longtitude,
          },
        },
      },
    });
  }
  async updateRiderById(id: number , data: Prisma.RiderUpdateInput , latitude?:number , longtitude?:number) {
    const findRider = await this.getRiderById(id);
    if(!findRider) {
        throw new HttpException('Rider Not Found' , 404);
    }
    // update latitude & longtitude first
    if((latitude !== undefined || longtitude !== undefined ) && findRider.riderPosition) {
        await this.prisma.riderPosition.update({
            where: {id : findRider.riderPosition.id},
            data: {
                latitude: latitude ?? findRider.riderPosition.latitude,
                longtitude: longtitude ?? findRider.riderPosition.longtitude,
            }
        })
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
