import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateLocationDto } from 'src/riders/dtos/CreateLocationDto';
import { CreateRiderDto } from 'src/riders/dtos/CreateRiderDto';
import { UpdateRiderDto } from 'src/riders/dtos/UpdateRiderDto';
import { RidersService } from 'src/riders/services/riders/riders.service';

@Controller('riders')
export class RidersController {
  constructor(private riderService: RidersService) {}

  // GET /riders
  @ApiOperation({ summary: 'Retrive every rider info' })
  @Get()
  getRiders() {
    return this.riderService.getRiders();
  }
  // GET /riders/search?latitude{latitude}&longitude={longitude}
  @ApiOperation({ summary: 'Used to search for nearby rider (within 5km)' })
  @Get('search')
  getNearbyRider(
    @Query('latitude', ParseFloatPipe) latitude: number,
    @Query('longitude', ParseFloatPipe) longitude: number,
  ) {
    return this.riderService.getNearbyRider(latitude, longitude);
  }
  // GET /riders/:id
  @ApiOperation({ summary: 'Used to retrive rider info by specified id' })
  @Get(':id')
  async getRiderById(@Param('id', ParseIntPipe) id: number) {
    const rider = await this.riderService.getRiderById(id);
    if (!rider) {
      throw new HttpException('Rider Not Found', 404);
    }
    return rider;
  }
  // POST /riders
  @ApiOperation({ summary: 'Used to create new rider' })
  @Post()
  @UsePipes(ValidationPipe)
  createRider(@Body() createRiderDto: CreateRiderDto) {
    const { latitude, longitude, ...riderInfo } = createRiderDto;
    return this.riderService.createRider(riderInfo, latitude, longitude);
  }
  // PATCH /riders/:id
  @ApiOperation({ summary: 'Used to update already existed rider by id' })
  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateRiderById(
    @Body() updateRiderDto: UpdateRiderDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.riderService.updateRiderById(id, updateRiderDto);
  }
  // DELETE /riders/:id
  @ApiOperation({ summary: 'Used to delete rider by id' })
  @Delete(':id')
  @UsePipes(ValidationPipe)
  deleteRiderById(@Param('id', ParseIntPipe) id: number) {
    return this.riderService.deleteRiderById(id);
  }
  // GET /riders/:riderId/locations
  @ApiOperation({
    summary: 'Used to get location information of certain rider from id',
  })
  @Get(':riderId/locations')
  async getLocationByRiderId(@Param('riderId', ParseIntPipe) riderId: number) {
    const rider = await this.riderService.getRiderById(riderId);
    if (!rider) {
      throw new HttpException('Rider Not Found', 404);
    }
    if (!rider.riderPosition) {
      throw new HttpException('Rider has no location', 404);
    }
    return await rider.riderPosition;
  }
  // POST /riders/:riderId/locations
  @ApiOperation({
    summary:
      'Used to get create location information for already existed rider by id',
  })
  @Post(':riderId/locations')
  @UsePipes(ValidationPipe)
  async createLocationByRiderId(
    @Param('riderId', ParseIntPipe) riderId: number,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    return this.riderService.createLocationByRiderId(
      riderId,
      createLocationDto,
    );
  }
}
