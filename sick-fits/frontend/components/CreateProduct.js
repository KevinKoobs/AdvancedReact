import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import DisplayError from "./ErrorMessage";

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
	    # Which variables are passed in? And what types are they?
	    $name: String!
	    $description: String!
	    $price: Int!
	    $image: Upload
    ){
        createProduct(
	        data: {
	            name: $name
	            description: $description
	            price: $price
	            status: "AVAILABLE"
		        photo: {
			        create: {
				        image: $image
				        altText: $name
			        }
		        }
	        }
        ) {
            id
            price
            description
            name
        }
    }
`;

export default function CreateProduct() {
	const {inputs, handleChange, resetForm, clearForm} = useForm({
		image: '',
		name: 'Test',
		price: 1234,
		description: 'Best Test ever!',
	});
	const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
		// Because 'inputs' is named precisely as the mutation asks, we can pass that through as a object
		variables: inputs
	});
	return (
		<Form onSubmit={async (e) => {
			e.preventDefault();
			// Submit inputfields to backend
			await createProduct();
			clearForm();
		}}>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
				<label htmlFor="image">
					Image
					<input type="file" id="image" name="image"
					       onChange={handleChange} required />
				</label>
				<label htmlFor="name">
					Name
					<input type="text" name="name" id="name" placeholder="Name"
					       value={inputs.name}
					       onChange={handleChange}
					/>
				</label>
				<label htmlFor="price">
					Price
					<input type="number" name="price" id="price" placeholder="Price"
					       value={inputs.price}
					       onChange={handleChange}/>
				</label>
				<label htmlFor="description">
					Description
					<textarea name="description" id="description" value={inputs.description} onChange={handleChange} />
				</label>
				<button type="submit">+ Add product</button>
			</fieldset>
		</Form>
	)
}
