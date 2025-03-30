import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { distance } from 'src/utils/distance';

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
  async getNearbyRider(latitude: number, longitude: number) {
    const riders = await this.getRiders();
    return riders.filter(
      (rider) =>
        rider.riderPosition &&
        distance(
          latitude,
          longitude,
          rider.riderPosition.latitude,
          rider.riderPosition.longitude,
        ) <= 5,
    );
  }
  createRider(
    data: Prisma.RiderCreateInput,
    latitude: number,
    longitude: number,
  ) {
    return this.prisma.rider.create({
      data: {
        ...data,
        riderPosition:
          latitude !== undefined && longitude !== undefined
            ? {
                create: {
                  latitude,
                  longitude,
                },
              }
            : undefined,
      },
    });
  }
  async updateRiderById(id: number, data: Prisma.RiderUpdateInput) {
    const findRider = await this.getRiderById(id);
    if (!findRider) {
      throw new HttpException('Rider Not Found', 404);
    }
    return await this.prisma.rider.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }
  async deleteRiderById(id: number) {
    const findRider = await this.getRiderById(id);
    if (!findRider) {
      throw new HttpException('Rider not found', 404);
    }
    // delete riderPosition first
    if (findRider.riderPosition) {
      await this.prisma.riderPosition.delete({
        where: { id: findRider.riderPosition?.id },
      });
    }
    return this.prisma.rider.delete({ where: { id } });
  }
  async createLocationByRiderId(
    id: number,
    data: Prisma.RiderPositionCreateWithoutRiderInput,
  ) {
    const findRider = await this.getRiderById(id);
    if (!findRider) {
      throw new HttpException('Rider not found', 404);
    }
    return this.prisma.rider.update({
      where: { id },
      data: {
        riderPosition: {
          create: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
        },
      },
      select: { riderPosition: true },
    });
  }
}
