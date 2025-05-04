import { useFonts } from "expo-font";
import "react-native-reanimated";

import "@walletconnect/react-native-compat";

import "../polyfills";
import { WelcomePage } from "@/components/pages/WelcomePage";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
function RootLayout() {
	const { isConnected } = useWalletConnectModal();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!isConnected) {
		return <WelcomePage />;
	}

	return (
		<Tabs>
			<Tabs.Screen
				name="wallet"
				options={{
					headerShown: false,
					title: "Wallet",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="wallet" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}

export default RootLayout;
