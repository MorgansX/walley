import type React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import type { AppButtonProps } from "@/components/ui/AppButton/types";
import { ButtonVariants } from "@/components/ui/AppButton/types";

const colorVariants = {
	[ButtonVariants.ERROR]: "#FF6363",
	[ButtonVariants.COMMON]: "#3A59D1",
	[ButtonVariants.SUCCESS]: "#5DB996",
};

export const AppButton: React.FC<AppButtonProps> = ({
	title,
	onPress,
	variant = ButtonVariants.COMMON,
}) => {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: colorVariants[variant] }]}
			color="blue"
			onPress={onPress}
		>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 55,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 24,
		fontWeight: "black",
		color: "#fff",
	},
});
