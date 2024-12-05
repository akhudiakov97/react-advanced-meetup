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
    return /* @__PURE__ */ jsx("div", { className: "text-center text-lg", children: "Loading news..." });
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: articles.map((article, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: article.urlToImage || "/default-news-image.jpg",
          alt: article.title,
          className: "w-full h-64 object-cover brightness-90 hover:brightness-100 transition-all duration-300"
        }
      ),
      /* @__PURE__ */ jsx(Like, { className: "absolute bottom-2 right-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-3 line-clamp-2", children: article.title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm mb-4 line-clamp-3", children: article.description }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: article.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-indigo-600 font-medium hover:text-indigo-500 transition-colors",
          children: "Read More"
        }
      )
    ] })
  ] }, index)) });
}
async function Page() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-6xl font-extrabold text-center text-gray-900 mb-8 tracking-tight", children: "Top US Headlines" }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "text-center text-lg", children: "Getting news" }), children: /* @__PURE__ */ jsx(News, {}) })
  ] });
}
export {
  Page as default
};
