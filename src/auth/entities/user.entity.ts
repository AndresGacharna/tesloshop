import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    
    @ApiProperty({
            example: 'bda16b3e-7994-4bd0-97c0-2e014433d963',
            description: 'Product ID',
            uniqueItems: true
        })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'papotemalote@yopmail.com',
        description: 'User email',
        uniqueItems: true
    })
    @Column('text',{
        unique:true,
    })
    email:string;

    @ApiProperty({
        example: 'Abc123',
        description: 'User password',
    })
    @Column('text',{
        select: false
    })
    password:string;

    @ApiProperty({
        example: 'Andres Felipe Gacharná Tibocha',
        description: 'User fullname',
        uniqueItems: true
    })
    @Column('text')
    fullName:string;

    @ApiProperty({
        example: 'True if the user is active',
        description: 'Shows if the user is active',
        default: true,
    })
    @Column('bool',{
        default:true,
    })
    isActive:boolean;

    @Column('text',{
        array:true,
        default:['user']
    })
    roles: string[];

    @OneToMany(
        () => Product,
        (product) => product.user
    )
    product: Product;
    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }
    
    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();

    }


}
