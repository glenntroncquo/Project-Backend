import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entity'
import { UserAddress } from '../useraddress/useraddress.entity'

@Entity('Address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  address_id?: string
  @Column({ length: 250 })
  street?: string
  @Column()
  number?: number
  @Column()
  city?: string
  @Column()
  state?: string
  @Column()
  postal_code?: string
  @Column()
  country?: string

  @OneToMany(() => UserAddress, (userAddress) => userAddress.address)
  userConnection?: User[]
}
