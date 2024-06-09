import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {join} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 借助 alias 让项目认识 '@'
    alias: {
      '@':join(__dirname,'./src')
    }
  }
})
