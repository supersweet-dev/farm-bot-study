// @ts-check
import { defineConfig } from 'astro/config';
import vercelServerless from '@astrojs/vercel/serverless';
import icon from 'astro-icon';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://supersweet.dev',
    output: 'server',
    adapter: vercelServerless({}),
    integrations: [icon(), react()],
});