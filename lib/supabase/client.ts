import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
	// Create a supabase client on the browser with project's credentials
	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	) {
		throw new Error("Supabase環境変数が設定されていません");
	}
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	)
}