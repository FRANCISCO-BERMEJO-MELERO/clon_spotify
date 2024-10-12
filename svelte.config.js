import { vitePreprocess } from '@astrojs/svelte';
import adapter from '@sveltejs/adapter-node';


export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	}
}
