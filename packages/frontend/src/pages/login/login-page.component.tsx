import React from 'react';
import { PageWrapper } from './login-page.styles';
import LoginForm from '~shared/components/login-form/login-form.component';

const LoginPage: React.FC = () => {
	return (
		<PageWrapper>
			<LoginForm />
		</PageWrapper>
	);
};

export default LoginPage;
