import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
// import rehypePrettyCode from "rehype-pretty-code";
import remarkReadingTime from "./src/plugins/remark-reading-time.mjs";
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import preact from "@astrojs/preact";
import Icons from "unplugin-icons/vite";
import Typed from 'typed.js';
import react from 'react'

const rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind(), preact()],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: 'shiki',
    
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [rehypeMathjax],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      //theme: 'one-dark',
      // Alternatively, provide multiple themes
      // https://github.com/antfu/shikiji#lightdark-dual-themes
      experimentalThemes: {
        light: 'vitesse-light',
        dark: 'nord',
      },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  experimental: {
    assets: true,
  },
  vite: {
    plugins: [
      Icons({
        compiler: "jsx",
        jsx: "preact",
        autoInstall: true,
      }),
    ],
  },
});

/* rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]], */