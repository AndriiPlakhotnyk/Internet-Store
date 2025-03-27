import * as yup from 'yup';

export const profileSchema = yup.object({
	email: yup.string().email('Invalid email').required('Email is required'),
	fullName: yup
		.string()
		.min(2, 'Full name must be at least 2 characters')
		.required('Full name is required'),
	phoneNumber: yup
		.string()
		.matches(/^\+?\d{10,15}$/, 'Invalid phone number')
		.required('Phone number is required'),
	shippingAddress: yup
		.string()
		.min(5, 'Address must be at least 5 characters')
		.required('Address is required'),
});
