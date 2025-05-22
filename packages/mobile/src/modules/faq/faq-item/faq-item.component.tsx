import React, { useState } from 'react';
import { Text, TouchableOpacity, View, LayoutAnimation } from 'react-native';
import { faqStyles } from './faq-item.styles';

interface FAQItemProps {
	question: string;
	answer: string;
}

export const FAQItem = ({ question, answer }: FAQItemProps) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpanded((prev) => !prev);
	};

	return (
		<View style={[faqStyles.wrapper]}>
			<TouchableOpacity
				style={faqStyles.header}
				onPress={toggleExpand}
				activeOpacity={0.8}
			>
				<Text style={faqStyles.question}>{question}</Text>
				<Text style={faqStyles.arrow}>{expanded ? '▾' : '▸'}</Text>
			</TouchableOpacity>

			<View
				style={[
					faqStyles.answerContainer,
					{ height: expanded ? null : 0 },
				]}
			>
				<Text style={faqStyles.answer}>{answer}</Text>
			</View>
		</View>
	);
};
