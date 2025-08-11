import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Esta regra cria a "ponte" entre o frontend e o backend
      '/api': {
        // O destino da ponte: nosso servidor Bun na porta 3000
        target: 'http://localhost:3000',

        // Configuração essencial para a ponte funcionar corretamente
        changeOrigin: true,
      },
    },
  },
});