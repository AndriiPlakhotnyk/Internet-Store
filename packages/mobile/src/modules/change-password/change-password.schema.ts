import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({
	currentPassword: yup.string().required('Current password is required'),
	newPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('New password is required')
		.test(
			'not-same-as-old',
			'New password must be different from current password',
			function (value) {
				const { currentPassword } = this.parent;
				return value !== currentPassword;
			},
		),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'Passwords must match')
		.required('Please confirm your new password'),
});
