import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRiderDto } from 'src/riders/dtos/CreateRiderDto';
import { UpdateRiderDto } from 'src/riders/dtos/UpdateRiderDto';
import { RidersService } from 'src/riders/services/riders/riders.service';

@Controller('riders')
export class RidersController {
    constructor(private riderService: RidersService ) {}
    
    // GET /riders
    @Get()
    getRiders() {
        return this.riderService.getRiders();
    }
    // GET /riders/:id
    @Get(':id')
    async getRiderById(@Param('id' , ParseIntPipe) id:number) {
        const rider = await this.riderService.getRiderById(id);
        if(!rider) {
            throw new HttpException('Rider Not Found' , 404);
        }
        return rider ; 
    }
    // POST /riders
    @Post() 
    @UsePipes(ValidationPipe)
    createRider(@Body() createRiderDto: CreateRiderDto) {
        const {latitude , longtitude , ...riderInfo} = createRiderDto
        return this.riderService.createRider(riderInfo , latitude , longtitude);
    }
    // PATCH /riders/:id
    @Patch(':id')
    @UsePipes(ValidationPipe)
    updateRiderById(@Body() updateRiderDto: UpdateRiderDto , @Param('id' , ParseIntPipe) id:number) {
        const {latitude , longtitude , ...updateRiderInfo} = updateRiderDto;
        return this.riderService.updateRiderById(id , updateRiderInfo , latitude , longtitude);
    }
    // DELETE /riders/:id
    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteRiderById(@Param('id' , ParseIntPipe) id:number) {
        return this.riderService.deleteRiderById(id);
    }
}
