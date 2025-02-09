import { defineConfig, loadEnv } from "vite";

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.BASE_URL,
  }
});

export default config;