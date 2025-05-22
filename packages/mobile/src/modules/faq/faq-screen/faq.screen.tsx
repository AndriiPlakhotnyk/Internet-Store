import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FAQItem } from '../faq-item';
import { Header } from 'src/shared/componetnts/header';
import { Layout } from 'src/shared/componetnts/layout';

export const FAQScreen = () => {
	return (
		<Layout>
			<ScrollView style={styles.screen}>
				<Header text={'FAQ'} />
				<FAQItem
					question="Is it safe to buy from us?"
					answer="There are many variations of passages of Lorem Ipsum available,
					but the majority have suffered alteration in some form, by injected humour,
					or randomised words which don't look even slightly believable.
					If you are going to use a passage of Lorem Ipsum,
					you need to be sure there isn't anything embarrassing hidden in the middle of text."
				/>
				<FAQItem
					question="How fast is delivery?"
					answer="Delivery usually takes 2-5 business days depending on your location."
				/>
			</ScrollView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		gap: 100,
	},
});
