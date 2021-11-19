import { Controller, Get, Param, Req } from '@nestjs/common'
import { Topping } from './topping.entity'
import { ToppingService } from './topping.service'

@Controller('topping')
export class ToppingController {
  constructor(private toppingService: ToppingService) {}

  @Get()
  async getAll(): Promise<Topping[]> {
    return await this.toppingService.getAll()
  }

  @Get('/one/:topping_id')
  async getOne(@Param() params): Promise<Topping> {
    return await this.toppingService.getOne(params.topping_id)
  }
}
