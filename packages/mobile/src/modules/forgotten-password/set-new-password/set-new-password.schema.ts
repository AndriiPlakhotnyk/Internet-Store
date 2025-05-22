import * as yup from 'yup';

export const recoverPasswordSchema = yup.object().shape({
	newPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('New password is required'),
	confirmPassword: yup
		.string()
		.test('match', 'Passwords must match', function (value) {
			const { newPassword } = this.parent;
			return !value || value === newPassword;
		})
		.required('Please confirm your password'),
});
