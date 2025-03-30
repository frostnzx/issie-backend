import { Module } from '@nestjs/common';
import { RidersController } from './controllers/riders/riders.controller';
import { RidersService } from './services/riders/riders.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RidersController],
  providers: [RidersService]
})
export class RidersModule {}
