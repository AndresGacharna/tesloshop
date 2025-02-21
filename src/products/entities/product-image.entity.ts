import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";



@Entity({name: 'product_images'} /*Acá cambiamos el nombre de la tabla a product_images*/ )
export class ProductImage{

    @PrimaryGeneratedColumn() // numero único que se autoincrementa solo, tambien se puede usar UUID
    id: number;


    @Column('text')
    url:string;

    @ManyToOne(
        () => Product,
        (product) => product.images,
        {onDelete:'CASCADE'}
    )
    product: Product
}