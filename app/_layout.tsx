
import '../polyfills';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import {createPublicClient, formatEther, http} from "viem";
import {mainnet} from "viem/chains";
import {useState, useEffect} from "react";
import {Button, Text} from "react-native";
import '@walletconnect/react-native-compat';
import { useWalletConnectModal, WalletConnectModal } from "@walletconnect/modal-react-native";

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
})

export default function RootLayout() {
    const { open, isConnected, provider, address: wcAddress } = useWalletConnectModal()
    const [blockNumber, setBlockNumber] = useState(0n)
    const [gasPrice, setGasPrice] = useState(0n)
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

    const projectId = process.env.EXPO_PUBLIC_CONNECTWALLET_ID;


    useEffect(() => {
        const getNetworkData = async () => {
            const [blockNumber, gasPrice] = await Promise.all([
                publicClient.getBlockNumber(),
                publicClient.getGasPrice(),
            ])

            setBlockNumber(blockNumber)
            setGasPrice(gasPrice)
        }

        getNetworkData();
    }, [projectId]);

    const providerMetadata = {
        name: 'Example dApp',
        description: 'Modern Example dApp from Callstack',
        url: 'https://callstack.com/',
        icons: ['https://example.com/'],
        redirect: {
            native: 'YOUR_APP_SCHEME://',
            universal: 'YOUR_APP_UNIVERSAL_LINK.com'
        }
    }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Text>Block number: {String(blockNumber)}</Text>
        <Text>Gas price: {formatEther(gasPrice)} ETH </Text>

        <Button title="Connect Wallet" onPress={() => open()}/>
        <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata}/>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
