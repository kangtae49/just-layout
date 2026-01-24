import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import {resolve} from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// https://vite.dev/config/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('__dirname', __dirname)
export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/lib'],
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'JustLayout',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  }
})
