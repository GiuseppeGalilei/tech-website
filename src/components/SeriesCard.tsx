import type { CollectionEntry } from "astro:content";
import { useState } from "preact/hooks";
import MaterialSymbolsKeyboardArrowDownRounded from "~icons/material-symbols/keyboard-arrow-down-rounded";
import MaterialSymbolsKeyboardArrowUpRounded from "~icons/material-symbols/keyboard-arrow-up-rounded";

interface Props {
  series: CollectionEntry<"series">;
  posts: CollectionEntry<"blog">[];
  order?: number;
}

export default function ({ series, posts, order }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div class="bg-neutral-100 dark:bg-neutral-800 rounded-md">
      <button
        class={` w-full p-5 rounded-md text-left space-y-2 border-2 border-neutral-300 dark:border-neutral-700  hover:bg-neutral-200 dark:hover:bg-neutral-700 ${
          isOpen ? "border-2 border-neutral-400 rounded-b-lg bg-neutral-200 dark:bg-neutral-700" : ""
        }`}
        onClick={handleOnClick}
      >
        <div class="flex items-center justify-between">
          <div class="flex items justify-center space-x-2">
            <h2 class="text-lg sm:text-xl font-bold">{series.data.title}</h2>
            <span class="text-lg sm:text-xl">{`${
              order ? ` • ${order} of ${posts.length}` : ` • ${posts.length} Parts`
            }`}</span>
          </div>
          <div class="">
            {isOpen ? (
              <MaterialSymbolsKeyboardArrowUpRounded style={{ fontSize: "1.5em" }} />
            ) : (
              <MaterialSymbolsKeyboardArrowDownRounded style={{ fontSize: "1.5em" }} />
            )}
          </div>
        </div>
        <p>{series.data.description}</p>
      </button>
      {isOpen && (
        <ul class="p-5 space-y-2">
          {posts.map((post, index) => (
            <li
              class={`relative pl-5 before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full ${
                !post.data.planned && order
                  ? order == index + 1
                    ? "before:bg-orange-600 before:ring-[3px] before:ring-orange-600/40"
                    : "before:bg-black dark:before:bg-white"
                  : !post.data.planned
                  ? "before:bg-black dark:before:bg-white"
                  : "before:bg-neutral-500 text-neutral-500"
              }`}
            >
              <a
                href={!post.data.planned ? `/blog/${post.slug}` : undefined}
                class={`space-x-2 ${
                  !post.data.planned
                    ? "hover:font-medium"
                    : "text-white0"
                }`}
              >
                <span>{post.data.title}</span>
                {post.data.planned && (
                  <span class="inline-flex items-center justify-center p-0.5 px-2 bg-yellow-400 rounded-full text-black text-xs">
                    Planned
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
