import * as yup from 'yup';

export const recoverPasswordSchema = yup.object({
	newPassword: yup
		.string()
		.required('New password is required')
		.min(6, 'Password must be at least 6 characters'),
	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
