export default function formatMoney(amount = 0) {
	const options = {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 2,
	}

	// Check if amount is clean euro
	if(amount % 100 === 0) {
		options.minimumFractionDigits = 0;
	}

	const formatter = Intl.NumberFormat('nl-NL', options);
	{/* Divide by 100 because prices in DB are in cents */}
	return formatter.format(amount / 100);
}
