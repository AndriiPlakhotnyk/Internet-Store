import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({
	oldPassword: yup.string().required('Old password is required'),
	newPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('New password is required'),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'Passwords must match')
		.required('Please confirm your new password'),
});
