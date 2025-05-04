export const ButtonVariants = {
	SUCCESS: "success",
	ERROR: "error",
	COMMON: "common",
} as const;

type ButtonVariant = "success" | "error" | "common";

export type AppButtonProps = {
	title: string;
	onPress: (args?: unknown) => unknown;
	variant: ButtonVariant;
};
