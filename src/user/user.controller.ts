import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * in our case our base URL is http://localhost:3000/user
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * POST http://localhost:3000/user
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * GET http://localhost:3000/user
   */
  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  /**
   * GET http://localhost:3000/user/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.viewUser(+id);
  }

  /**
   * PATCH http://localhost:3000/user/:id
   */
  @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto
    ) {
      try {
        const updatedUser = await this.userService.updateUser(+id, updateUserDto);
        return {
          status: 'success',
          data: updatedUser
        };
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }

  /**
   * DELETE http://localhost:3000/user/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
