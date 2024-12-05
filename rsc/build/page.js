// app/page.jsx
import { Suspense } from "react";
import Like from "./Like.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
async function News() {
  async function fetchNews() {
    const apiKey = "2f51b119b4ea4c7ea40e453d3748c17f";
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    return await response.json();
  }
  let articles = [];
  try {
    const newsData = await fetchNews();
    articles = newsData.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    articles = [];
  }
  if (!articles)
    return /* @__PURE__ */ jsx("div", { children: "Loading news..." });
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: articles.map((article, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg overflow-hidden shadow-md", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: article.urlToImage || "default-news-image.jpg",
        alt: article.title,
        className: "w-full h-48 object-cover"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: article.title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: article.description }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: article.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-block mt-2 text-blue-600 hover:underline",
          children: "Read More"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Like, {})
  ] }, index)) });
}
async function Page() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold text-center text-gray-800 mb-8", children: "Top US Headlines" }),
    /* @__PURE__ */ jsx(Suspense, { fallback: "Getting news", children: /* @__PURE__ */ jsx(News, {}) })
  ] });
}
export {
  Page as default
};
