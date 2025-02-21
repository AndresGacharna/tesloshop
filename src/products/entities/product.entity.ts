import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'products'} /*Acá cambiamos el nombre de la tabla a products*/)
export class Product {

    @ApiProperty({
        example: 'bda16b3e-7994-4bd0-97c0-2e014433d963',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty({
        example: 'T-shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text',{
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: '0',
        description: 'Product Price',
    })
    @Column('float',{
        default: 0
    })
    price:number;

    @ApiProperty({
        example: 'Est officia eiusmod occaecat enim do proident est pariatur esse exercitation ullamco magna.',
        description: 'Product description',
        default: null,
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text',{
        unique:true
    })
    slug:string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int',{
        default:0
    })
    stock: number;

    @ApiProperty({
        example: ['M','XL','XXL'],
        description: 'Product sizes',
        uniqueItems: true
    })
    @Column('text',{
        array:true
    })
    sizes:string[]

    @ApiProperty({
        example: 'women',
        description: 'Product gender',
    })
    @Column('text')
    gender:string;


    @ApiProperty()
    @Column('text', {
        array:true,
        default:[]
    })
    tags: string[];
    
    
    //images
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager:true} //Eager "habilita" o le da permisos al metodo find para cargar las imagenes, más información en: https://typeorm.io/eager-and-lazy-relations
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager: true}
    )
    user: User

    
    @BeforeInsert() //ES PROGRAMACION ANTES DE INSERTAR LOS DATOS, EN ESTE CASO REEMPLAZAMOS LOS ESPACIOS POR '_' Y LAS COMILLAS POR VACIO
    checkSlugInsert(){

        if(!this.slug){
            this.slug = this.title
        }

        this.slug= this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug= this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }
}
