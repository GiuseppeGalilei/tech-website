import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog= defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().transform((t) =>
        t
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.replace(word[0], word[0].toUpperCase());
          })
          .join(" ")
      ),
      description: z.string(),
      tags: z
        .string()
        .array()
        .transform((tags) => tags.map((tag) => `#${tag}`)),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      ready: z.boolean().default(false),
      planned: z.boolean().default(false),
      seriesId: z.string().optional(),
      orderInSeries: z.number().optional(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      cover: z.string().optional(),
      coverAlt: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().transform((t) =>
        t
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.replace(word[0], word[0].toUpperCase());
          })
          .join(" ")
      ),
      description: z.string(),
      tags: z
        .string()
        .optional()
        .array()
        .transform((tags) => tags.map((tag) => `#${tag}`)),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      ready: z.boolean().default(false),
      planned: z.boolean().default(false),
      seriesId: z.string().optional(),
      orderInSeries: z.number().optional(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      cover: z.string().optional(),
      coverAlt: z.string().optional(),
    }),
});

const misc = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/misc" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().transform((t) =>
        t
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.replace(word[0], word[0].toUpperCase());
          })
          .join(" ")
      ),
      description: z.string(),
      tags: z
        .string()
        .array()
        .transform((tags) => tags.map((tag) => `#${tag}`)),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      planned: z.boolean().default(false),
      seriesId: z.string().optional(),
      orderInSeries: z.number().optional(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      cover: z.string().optional(),
      coverAlt: z.string().optional(),
    }),
});

const series = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/series" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
  }),
});
export const collections = { blog, series, projects, misc };
