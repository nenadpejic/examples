import type { ReactNode } from "react";
import { TanstackQueryProvider } from "./tanstack-query-provider";

type Props = {
	children: ReactNode;
};

export const Providers = ({ children }: Props) => {
	return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
};
