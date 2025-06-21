import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

        constructor(private readonly userService: UsersService){}

    //GET /users
   @Get() 
//    findAll(){
    // GET //users?role=value
   findAll(@Query('role') role?: 'ADMIN' | 'USER') {
    return this.userService.findAll(role)
   }

   //GET /users/:id
   @Get(':id') 
   findOne(@Param('id') id: String){
    return this.userService.findOne(+id)// add (+) in id is unary plus (convet it into a number)
   }

   //POST / users
   @Post()
   create(@Body() user: {name: string, email: string, role: 'ADMIN'| 'USER'}){
    return this.userService.create(user)
   }

   //PATCH /users/:id
   @Patch(':id')
   update(@Param('id') id: string, @Body() userUpdate:{name?: string, email?: string, role?:'ADMIN' | 'USER'}){
    return this.userService.update(+id, userUpdate)
   }

    //DELETE /users/:id
   @Delete(':id')
   delete(@Param('id') id: string){
    return this.userService.delete(+id)
   }
}
