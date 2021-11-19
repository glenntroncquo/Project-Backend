import { Controller, Get, Param, Req } from '@nestjs/common'
import { Pizza } from './pizza.entity'
import { PizzaService } from './pizza.service'

@Controller('pizza')
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}

  @Get('one/:id')
  async getOne(@Param() params): Promise<Pizza> {
    return await this.pizzaService.getOne(params.id)
  }

  @Get('name/:name')
  async findOne(@Param() params): Promise<Pizza> {
    return await this.pizzaService.findOne(params.name)
  }

  @Get()
  async getAll(): Promise<Pizza[]> {
    return await this.pizzaService.getAll()
  }
}
