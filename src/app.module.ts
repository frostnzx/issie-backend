import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { RidersModule } from './riders/riders.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RidersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
