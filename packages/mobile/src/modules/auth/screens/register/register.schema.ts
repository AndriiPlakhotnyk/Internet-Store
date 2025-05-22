import * as yup from 'yup';

export const registerSchema = yup.object({
	email: yup.string().email('Invalid email').required('Email is required'),
	fullName: yup
		.string()
		.matches(
			/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]+$/,
			'Full name should contain only letters',
		)
		.required('Full name is required'),
	phoneNumber: yup
		.string()
		.matches(/^\+?\d+$/, 'Invalid phone number')
		.required('Phone number is required'),
	shippingAddress: yup.string().required('Address is required'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords should match')
		.required('Confirm password is required'),
});
