import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Address } from '../address/address.entity'
import { User } from '../user/user.entity'

@Entity('User_Address')
export class UserAddress {
  @PrimaryColumn('uuid')
  user_id?: string
  @PrimaryColumn('uuid')
  address_id?: string

  @ManyToOne(() => User, (user) => user.addressConnection, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user?: User

  @ManyToOne(() => Address, (address) => address.userConnection, {
    primary: true,
  })
  @JoinColumn({ name: 'address_id' })
  address?: Address
}
