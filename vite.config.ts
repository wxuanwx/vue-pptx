import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  // const isBuild = command === 'build';
  const isProd = mode === 'production'

  return {
    publicPath: '/',
    plugins: [
      vue(),
      dts({
        entryRoot: 'package',
        outDir: 'lib',
        staticImport: true,  // 静态导入，优化 Tree Shaking
        tsconfigPath: 'tsconfig.app.json',
        include: ['package/**/*'],
        exclude: ['src/**/*', 'package/**/__tests__/*', 'package/**/*.stories.ts'],
        cleanVueFileName: true, // 清理 Vue 组件的 .vue.d.ts 后缀（可选）
        insertTypesEntry: true
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        '@/package': path.resolve(__dirname, './package') // 确保别名正确
      },
      extensions: ['.vue', '.js', '.json', '.ts', '.tsx']
    },
    build: {
      target: 'ES2020', // 兼容现代浏览器，避免过度转译（减小体积）
      outDir: 'lib',
      minify: 'esbuild', // 生产环境压缩（esbuild 比 terser 快且压缩率高）
      sourcemap: false, // 生产环境不生成 sourcemap（减小体积）
      lib: {
        entry: path.resolve(__dirname, 'package/index.ts'), // 组件入口
        name: 'VuePptx', // UMD 全局变量名
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'umd'] // 只生成两种核心格式（足够兼容）
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            'vue': 'vue'
          },
          comments: false,
          exports: 'named'
        }
      },
      // 样式优化：压缩 CSS，提取单独文件
      cssCodeSplit: true, // 生产环境拆分 CSS（避免内联到 JS）
      cssMinify: 'esbuild' // 压缩 CSS
    },
    // 开发环境优化：避免不必要的转译
    esbuild: {
      // drop: isProd ? ['console', 'debugger'] : [] // 生产环境移除 console 和 debugger
    }
  }
})
