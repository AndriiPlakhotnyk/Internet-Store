// vite.config.ts
import { defineConfig } from "file:///mnt/c/projects/camp-02.12/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/projects/camp-02.12/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///mnt/c/projects/camp-02.12/node_modules/vite-plugin-svgr/dist/index.js";
import { ViteAliases } from "file:///mnt/c/projects/camp-02.12/node_modules/vite-aliases/dist/index.js";
import EnvironmentPlugin from "file:///mnt/c/projects/camp-02.12/node_modules/vite-plugin-environment/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true
      },
      include: "**/*.svg"
    }),
    ViteAliases(),
    EnvironmentPlugin("all")
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvcHJvamVjdHMvY2FtcC0wMi4xMi9wYWNrYWdlcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21udC9jL3Byb2plY3RzL2NhbXAtMDIuMTIvcGFja2FnZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9jL3Byb2plY3RzL2NhbXAtMDIuMTIvcGFja2FnZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCB7IFZpdGVBbGlhc2VzIH0gZnJvbSAndml0ZS1hbGlhc2VzJztcbmltcG9ydCBFbnZpcm9ubWVudFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lbnZpcm9ubWVudCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbXG5cdFx0cmVhY3QoKSxcblx0XHRzdmdyKHtcblx0XHRcdC8vIHN2Z3Igb3B0aW9uczogaHR0cHM6Ly9yZWFjdC1zdmdyLmNvbS9kb2NzL29wdGlvbnMvXG5cdFx0XHRzdmdyT3B0aW9uczoge1xuXHRcdFx0XHRleHBvcnRUeXBlOiAnZGVmYXVsdCcsXG5cdFx0XHRcdHJlZjogdHJ1ZSxcblx0XHRcdFx0c3ZnbzogZmFsc2UsXG5cdFx0XHRcdHRpdGxlUHJvcDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRpbmNsdWRlOiAnKiovKi5zdmcnLFxuXHRcdH0pLFxuXHRcdFZpdGVBbGlhc2VzKCksXG5cdFx0RW52aXJvbm1lbnRQbHVnaW4oJ2FsbCcpLFxuXHRdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNULFNBQVMsb0JBQW9CO0FBQ25WLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxtQkFBbUI7QUFDNUIsT0FBTyx1QkFBdUI7QUFHOUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBO0FBQUEsTUFFSixhQUFhO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsTUFDWjtBQUFBLE1BQ0EsU0FBUztBQUFBLElBQ1YsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLElBQ1osa0JBQWtCLEtBQUs7QUFBQSxFQUN4QjtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
