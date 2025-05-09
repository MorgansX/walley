import { useRef, useState } from "react";

export const useWalletData = () => {
	const currentWalletIndex = useRef(0);
	const [tokenBalances, setTokenBalances] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	return { isLoading, currentWalletIndex };
};
