import useForm from "../lib/useForm";
import Form from "./styles/Form";

export default function CreateProduct() {
	const {inputs, handleChange, resetForm, clearForm} = useForm({
		image: '',
		name: 'Test',
		price: 1234,
		description: 'Best Test ever!',
	});
	return (
		<Form onSubmit={(e) => {
			e.preventDefault();
		}}>
			<fieldset>
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
