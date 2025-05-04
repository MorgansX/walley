import React, { PropsWithChildren } from "react";
import { View, StyleSheet, Platform, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

export const PageContainer: React.FC<PropsWithChildren> = ({ children }) => (
	<View style={styles.wrapper}>
		<SafeAreaView
			style={[
				styles.wrapper,
				Platform.OS === "android" && {
					paddingTop: StatusBar.currentHeight || 0,
				},
			]}
		>
			{children}
		</SafeAreaView>
	</View>
);

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
