import { create } from "zustand";

const INITIAL_STATE = {
	blockNumber: 0n,
	gasPrice: 0n,
};

const useNetworkData = create((set) => ({
	state: INITIAL_STATE,
	setBlockNumber: (value) =>
		set((state) => ({
			state: {
				...state.state,
				blockNumber: value,
			},
		})),
	setGasPrice: (value) =>
		set((state) => ({
			state: {
				...state.state,
				gasPrice: value,
			},
		})),
}));

export default useNetworkData;
