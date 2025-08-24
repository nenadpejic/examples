import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";

const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export type AuthContext = {
	isAuthenticated: boolean;
	login: () => Promise<void>;
	logout: () => Promise<void>;
	user: string | null;
};

const AuthContext = createContext<AuthContext | null>(null);

const key = "auth.user";

function getStoredUser() {
	return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
	if (user) {
		localStorage.setItem(key, user);
	} else {
		localStorage.removeItem(key);
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<string | null>(getStoredUser());
	const isAuthenticated = !!user;

	const logout = useCallback(async () => {
		await sleep(250);

		setStoredUser(null);
		setUser(null);
	}, []);

	const login = useCallback(async () => {
		await sleep(500);

		setStoredUser("anonymous");
		setUser("anonymous");
	}, []);

	// useEffect(() => {
	// 	setUser(getStoredUser());
	// }, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
