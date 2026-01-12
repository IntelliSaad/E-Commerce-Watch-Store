import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, MessageSquare, ShoppingBag, Star } from "lucide-react";
import { d as db } from "../index.mjs";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import "vite-react-ssg";
import "firebase/auth";
import "firebase/app";
import "react-helmet-async";
import "@vercel/analytics/react";
const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(
          reviewsRef,
          where("isApproved", "==", true),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllReviews();
  }, []);
  const renderStars = (rating) => /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
    Star,
    {
      size: 16,
      className: star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
    },
    star
  )) });
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
  };
  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
        "Back to Home"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Customer Reviews" }),
          reviews.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            renderStars(Math.round(averageRating)),
            /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-bold", children: averageRating.toFixed(1) }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
              "(",
              reviews.length,
              " verified reviews)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-400 text-sm bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50", children: [
          /* @__PURE__ */ jsx(Camera, { size: 16, className: "text-yellow-500" }),
          /* @__PURE__ */ jsx("span", { children: "All reviews include photos from verified buyers" })
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "text-center py-16", children: /* @__PURE__ */ jsx("div", { className: "animate-pulse text-gray-400", children: "Loading reviews..." }) }) : reviews.length === 0 ? (
      // Empty State
      /* @__PURE__ */ jsx("div", { className: "text-center py-16", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 max-w-lg mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(MessageSquare, { className: "text-yellow-500", size: 36 }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-3", children: "No Reviews Yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "Be the first to share your experience! After your order is delivered, you can leave a review with photos." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-900/50 rounded-xl p-4 mb-6 text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-yellow-500 font-semibold text-sm mb-3", children: "How to Leave a Review:" }),
          /* @__PURE__ */ jsxs("ol", { className: "space-y-2 text-gray-400 text-sm", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-yellow-500 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0", children: "1" }),
              /* @__PURE__ */ jsx("span", { children: "Purchase a product from our store" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-yellow-500 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0", children: "2" }),
              /* @__PURE__ */ jsx("span", { children: "Wait for your order to be delivered" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-yellow-500 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0", children: "3" }),
              /* @__PURE__ */ jsx("span", { children: "Submit your review with at least 1 photo" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/shop",
            className: "inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors",
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, { size: 18 }),
              "Start Shopping"
            ]
          }
        )
      ] }) })
    ) : (
      // Reviews Grid
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3", children: reviews.map((review) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-yellow-500/20 transition-all",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0", children: review.customerName.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: review.customerName }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: renderStars(review.rating) }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-xs", children: formatDate(review.createdAt) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/product/${review.productId}`,
                className: "text-yellow-500 text-sm font-medium hover:text-yellow-400 transition-colors block mb-3",
                children: [
                  "🛒 ",
                  review.productName
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm leading-relaxed mb-4", children: review.comment }),
            review.images && review.images.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar", children: review.images.map((img, idx) => /* @__PURE__ */ jsx(
              "img",
              {
                src: img,
                alt: `Review ${idx + 1}`,
                className: "w-20 h-20 rounded-lg object-cover border border-gray-600 flex-shrink-0 hover:border-yellow-500/50 transition-colors cursor-pointer"
              },
              idx
            )) })
          ]
        },
        review.id
      )) })
    )
  ] });
};
export {
  ReviewsPage as default
};
