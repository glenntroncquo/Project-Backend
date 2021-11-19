import { Controller, Get, Param } from '@nestjs/common'
import { Size } from './size.entity'
import { SizeService } from './size.service'

@Controller('size')
export class SizeController {
  constructor(private sizeService: SizeService) {}
  @Get()
  async getSizes(): Promise<Size[]> {
    return await this.sizeService.getSizes()
  }
  @Get(':id')
  async getOneSize(@Param() params) {
    return await this.sizeService.getOneSize(params.id)
  }
}
