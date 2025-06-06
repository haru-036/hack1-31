import { createBrowserClient } from "@supabase/ssr";
export function createClient() {
	// Create a supabase client on the browser with project's credentials
	return createBrowserClient(
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
}
