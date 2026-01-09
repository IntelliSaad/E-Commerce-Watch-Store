import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // 1. Load all environment variables (including those starting with VITE_)
    const env = loadEnv(mode, process.cwd(), '');

    // 2. Extract the key using the correct prefix (VITE_)
    const GEMINI_API_KEY_VALUE = env.VITE_GEMINI_API_KEY;

    return {
        server: {
            port: 5173,
            host: '0.0.0.0',
        },
        plugins: [react()],
        build: {
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', 'react-router-dom'],
                        ui: ['lucide-react', 'framer-motion', 'swiper'],
                        firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
                    },
                },
            },
        },
        // 3. Inject the variable directly into the correct import.meta.env location
        define: {
            'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(GEMINI_API_KEY_VALUE),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});