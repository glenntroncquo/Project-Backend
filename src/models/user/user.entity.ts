import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from '../address/address.entity'
import { Order } from '../order/order.entity'
import { UserAddress } from '../useraddress/useraddress.entity'

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string
  @Column()
  name?: string
  @Column()
  lastname?: string
  @Column()
  email?: string
  @Column()
  phone_nr?: string
  password?: string

  @OneToMany(() => Order, (order) => order.user)
  orderConnection?: Order[]

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addressConnection?: Address[]
}
