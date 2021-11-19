import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Size } from './size.entity'

@Injectable()
export class SizeService {
  constructor(
    @Inject('SizeRepository') private sizeRepository: Repository<Size>,
  ) {}

  async getSizes() {
    return await this.sizeRepository.find()
  }

  async getOneSize(id: number) {
    return await this.sizeRepository.findOne()
  }
}
