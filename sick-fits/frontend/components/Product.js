import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import Link from "next/link";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

export default function Product({product}) {
	return <ItemStyles>
		{/*The ? checks if the item exists. Nested chaining is new in JS in 03-'21*/}
		<img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
		<Title>
			<Link href={`/product/${product.id}`}>{product.name}</Link>
		</Title>
		<PriceTag>{formatMoney(product.price)}</PriceTag>
		<p>{product.description}</p>
		{/*	Todo: Add buttons to edit and delete items */}
	</ItemStyles>
}
