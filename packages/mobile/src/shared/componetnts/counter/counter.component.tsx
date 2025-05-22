import { useState } from 'react';
import { counterStyles } from './counter.styles';
import { TouchableOpacity, View, Text } from 'react-native';

interface CounterProps {
	initial?: number;
	max: number;
	onChange?: (value: number) => void;
	disabled?: boolean;
}

export const Counter: React.FC<CounterProps> = ({
	initial = 1,
	max,
	onChange,
	disabled,
}) => {
	const [count, setCount] = useState(initial);

	const onIncrease = () => {
		if (count < max) {
			const newValue = count + 1;
			setCount(newValue);
			onChange?.(newValue);
		}
	};

	const onDecrease = () => {
		if (count > 1) {
			const newValue = count - 1;
			setCount(newValue);
			onChange?.(newValue);
		}
	};

	return (
		<View style={counterStyles.container}>
			<TouchableOpacity
				style={counterStyles.btn}
				onPress={onDecrease}
				disabled={disabled || count <= 1}
			>
				<Text style={counterStyles.btnText}>-</Text>
			</TouchableOpacity>

			<View style={counterStyles.counterBox}>
				<Text style={counterStyles.counterText}>{count}</Text>
			</View>

			<TouchableOpacity
				style={[
					counterStyles.btn,
					counterStyles.increase,
					count >= max && { opacity: 0.5 },
				]}
				onPress={onIncrease}
				disabled={disabled || count >= max}
			>
				<Text style={counterStyles.btnText}>+</Text>
			</TouchableOpacity>
		</View>
	);
};
