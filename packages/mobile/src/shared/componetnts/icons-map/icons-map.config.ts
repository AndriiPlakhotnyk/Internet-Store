import Logo from '../../../../assets/images/logo.svg';
import ProductsTab from '../../../../assets/images/products-tab.svg';
import OrdersTab from '../../../../assets/images/orders-tab.svg';
import SettingsTab from '../../../../assets/images/settings-tab.svg';
import Basket from '../../../../assets/images/basket.svg';
import Trash from '../../../../assets/images/trash.svg';
import BackArrow from '../../../../assets/images/back-arrow.svg';
import Card from '../../../../assets/images/card.svg';
import CheckMarkCircle from '../../../../assets/images/checkmark-circle.svg';
import RightArrow from '../../../../assets/images/right-arrow.svg';

export const IconsMap = {
	logo: Logo,
	productsTab: ProductsTab,
	ordersTab: OrdersTab,
	settingsTab: SettingsTab,
	basket: Basket,
	trash: Trash,
	backArrow: BackArrow,
	card: Card,
	checkMarkCircle: CheckMarkCircle,
	rightArrow: RightArrow,
} as const;

export type IconKey = keyof typeof IconsMap;

export const getIcon = (key: IconKey) => IconsMap[key];
