export const shortenAddress = (
	address: string,
	charsStart = 6,
	charsEnd = 4,
) => {
	if (!address) return "";
	return `${address.slice(0, charsStart)}...${address.slice(-charsEnd)}`;
};
