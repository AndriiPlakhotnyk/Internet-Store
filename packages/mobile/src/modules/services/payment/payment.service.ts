import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { CreatePaymentRequest } from '../types/payment';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';

class PaymentService {
	constructor(
		private readonly authHttpService: EnhancedWithAuthHttpService,
	) {}

	async payOrder(data: CreatePaymentRequest) {
		try {
			console.log('PAY_ORDER_START!');
			return this.authHttpService.post<CreatePaymentRequest, object>(
				'payment',
				data,
			);
		} catch (error) {
			console.error('Error to create payment', error);
			throw error;
		}
	}
}

export const paymentService = new PaymentService(
	new HttpFactoryService().createAuthHttpService(),
);
