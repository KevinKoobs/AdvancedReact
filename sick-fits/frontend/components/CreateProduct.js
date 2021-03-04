import { useState } from 'react';
import useForm from "../lib/useForm";

export default function CreateProduct() {
	const { inputs, handleChange, resetForm, clearForm } = useForm({
		name: 'Test',
		price: 1234,
		description: 'Best Test ever!',
	});
	return (
		<form>
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
				       onChange={handleChange} />
			</label>
			<button type="button" onClick={clearForm}>Clear form</button>
			<button type="button" onClick={resetForm}>Reset form</button>
		</form>
	)
}
