import {useState} from 'react';

export default function useForm(initial = {}) {
//	Create a state object for the inputs
	const [inputs, setInputs] = useState(initial);

	// Expecting output:
//	{
//		name: 'Kevin',
//		description: 'Nice shoes',
//		price: 1000,
//	}

	function handleChange(e)
	{
		let {value, name, type} = e.target;
		if (type === 'number') {
			value = parseInt(value);
		}
		if (type === 'file') {
			value[0] = e.target.files;
		}
		setInputs({
			// Copy existing state
			...inputs,
			[name]: value,
		});
	}

	function resetForm()
	{
		setInputs(initial);
	}

	function clearForm()
	{
		// Loop over all entries in inputs and return the key with an empty string as value
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, value]) => [key, ''])
		);
		setInputs(blankState);
	}

	// Return the things we want to surface from this hook
	return {
		inputs,
		handleChange,
		resetForm,
		clearForm
	}
}
