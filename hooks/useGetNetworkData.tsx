import { useEffect } from "react";
import { createPublicClient, http, formatEther } from "viem";
import { mainnet } from "viem/chains";
import useNetworkData from "@/store/useNetworkData";

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
}) as const;

export const useGetNetworkData = () => {
	const projectId = process.env.EXPO_PUBLIC_CONNECTWALLET_ID;
	const { setBlockNumber, setGasPrice, state: networkState } = useNetworkData();

	const fetchNetworkData = async () => {
		const [blockNumber, gasPrice] = await Promise.all([
			publicClient.getBlockNumber(),
			publicClient.getGasPrice(),
		]);

		setBlockNumber(String(blockNumber));
		setGasPrice(formatEther(gasPrice));
	};

	useEffect(() => {
		fetchNetworkData();
	}, [projectId]);

	return { networkState, projectId };
};
