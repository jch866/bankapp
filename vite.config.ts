import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // { mode: 'development', command: 'serve', ssrBuild: false }
  //获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //代理跨域 https://cn.vitejs.dev/config/server-options.html#server-proxy
    // server: {
    //   proxy: {
    //     [env.VITE_APP_BASE_API]: {
    //       //获取数据的服务器地址设置
    //       target: env.VITE_SERVE,
    //       //需要代理跨域
    //       changeOrigin: true,
    //       //路径重写
    //       rewrite: (path) => path.replace(/^\/api/, ""),
    //     },
    //   },
    // },
  };
});
