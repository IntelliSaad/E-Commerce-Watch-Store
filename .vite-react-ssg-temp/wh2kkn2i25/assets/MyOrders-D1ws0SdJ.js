import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, X, Loader2, Camera, Send, ArrowLeft, Phone, Search, Package, XCircle, CheckCircle, Truck, Clock } from "lucide-react";
import { a as useToast, d as db, b as uploadImageSecure } from "../index.mjs";
import { addDoc, collection, serverTimestamp, query, where, orderBy, getDocs } from "firebase/firestore";
import { c as compressImage } from "./imageOptimizer-CONHIO2n.js";
import "vite-react-ssg";
import "firebase/auth";
import "firebase/app";
import "react-helmet-async";
import "@vercel/analytics/react";
const sanitizeMultiline = (input, maxLength = 1e3) => {
  if (!input) return "";
  let sanitized = input.replace(/<script[^>]*>.*?<\/script>/gi, "").replace(/<iframe[^>]*>.*?<\/iframe>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "").trim();
  return sanitized.substring(0, maxLength);
};
const validateImageFile = (file) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 10 * 1024 * 1024;
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPEG, PNG, and WebP images are allowed" };
  }
  if (file.size > maxSize) {
    return { valid: false, error: "Image must be less than 10MB" };
  }
  return { valid: true };
};
const ReviewForm = ({
  orderId,
  productId,
  productName,
  customerName,
  customerPhone,
  onSuccess,
  onCancel
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const files = Array.from(e.target.files);
      for (const file of files) {
        if (images.length >= 5) {
          showToast("Maximum 5 images allowed", "error");
          break;
        }
        const validation = validateImageFile(file);
        if (!validation.valid) {
          showToast(validation.error || "Invalid file", "error");
          continue;
        }
        try {
          const compressedFile = await compressImage(file);
          const url = await uploadImageSecure(compressedFile);
          if (url) {
            setImages((prev) => [...prev, url]);
          } else {
            showToast("Failed to upload image via secure server", "error");
          }
        } catch (error) {
          console.error("Upload failed", error);
          showToast("Failed to process image", "error");
        }
      }
      setUploading(false);
    }
  };
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      showToast("Please select a rating", "error");
      return;
    }
    if (comment.trim().length < 10) {
      showToast("Please write at least 10 characters", "error");
      return;
    }
    if (images.length === 0) {
      showToast("Please upload at least 1 image", "error");
      return;
    }
    setSubmitting(true);
    try {
      const sanitizedComment = sanitizeMultiline(comment, 1e3);
      await addDoc(collection(db, "reviews"), {
        orderId,
        productId,
        productName,
        customerName,
        customerPhone,
        rating,
        comment: sanitizedComment,
        images,
        isApproved: true,
        // Auto-approve for now (can add admin moderation later)
        createdAt: serverTimestamp()
      });
      showToast("Thank you for your review!", "success");
      onSuccess == null ? void 0 : onSuccess();
    } catch (error) {
      showToast("Failed to submit review", "error");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-1", children: "Leave a Review" }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm mb-6", children: [
      "Share your experience with ",
      productName
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-gray-300 text-sm font-medium mb-2", children: "Your Rating *" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setRating(star),
              onMouseEnter: () => setHoverRating(star),
              onMouseLeave: () => setHoverRating(0),
              className: "p-1 transition-transform hover:scale-110",
              children: /* @__PURE__ */ jsx(
                Star,
                {
                  size: 28,
                  className: star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                }
              )
            },
            star
          )),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-400 text-sm self-center", children: rating > 0 && ["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-gray-300 text-sm font-medium mb-2", children: "Your Review *" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: comment,
            onChange: (e) => setComment(e.target.value),
            rows: 4,
            className: "w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all resize-none",
            placeholder: "Tell us about your experience with this product..."
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs mt-1", children: [
          comment.length,
          " / 500 characters"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-gray-300 text-sm font-medium mb-2", children: [
          "Upload Photos * ",
          /* @__PURE__ */ jsx("span", { className: "text-gray-500 font-normal", children: "(min 1, max 5)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
          images.map((img, idx) => /* @__PURE__ */ jsxs("div", { className: "relative w-20 h-20 group", children: [
            /* @__PURE__ */ jsx("img", { src: img, alt: `Upload ${idx + 1}`, className: "w-full h-full object-cover rounded-lg border border-gray-600" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removeImage(idx),
                className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity",
                children: /* @__PURE__ */ jsx(X, { size: 12 })
              }
            )
          ] }, idx)),
          images.length < 5 && /* @__PURE__ */ jsxs("label", { className: "w-20 h-20 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors", children: [
            uploading ? /* @__PURE__ */ jsx(Loader2, { className: "text-yellow-500 animate-spin", size: 20 }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Camera, { className: "text-gray-500 mb-1", size: 20 }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-xs", children: "Add" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "review-image",
                name: "review-image",
                accept: "image/*",
                multiple: true,
                onChange: handleFileChange,
                className: "hidden",
                disabled: uploading
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: submitting || uploading,
            className: "flex-1 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2",
            children: [
              submitting ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", size: 18 }) : /* @__PURE__ */ jsx(Send, { size: 18 }),
              "Submit Review"
            ]
          }
        ),
        onCancel && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onCancel,
            className: "px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] });
};
const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pending" },
  processing: { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", label: "Processing" },
  shipped: { icon: Truck, color: "text-purple-500", bg: "bg-purple-500/10", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Delivered" },
  cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Cancelled" }
};
const MyOrders = () => {
  var _a;
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [reviewingOrder, setReviewingOrder] = useState(null);
  const [reviewedItems, setReviewedItems] = useState(/* @__PURE__ */ new Set());
  const formatPhone = (input) => {
    const digits = input.replace(/\D/g, "");
    return digits.slice(0, 11);
  };
  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value));
  };
  const searchOrders = async (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("phone", "==", phone),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      const reviewsRef = collection(db, "reviews");
      const reviewsQuery = query(reviewsRef, where("customerPhone", "==", phone));
      const reviewsSnapshot = await getDocs(reviewsQuery);
      const reviewed = new Set(reviewsSnapshot.docs.map((doc) => doc.data().productId));
      setReviewedItems(reviewed);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const handleReviewSuccess = (productId) => {
    setReviewedItems((prev) => /* @__PURE__ */ new Set([...prev, productId]));
    setReviewingOrder(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
        "Back to Home"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "My Orders" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Enter your phone number to view your orders and leave reviews" })
    ] }),
    /* @__PURE__ */ jsx("form", { onSubmit: searchOrders, className: "mb-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 max-w-md", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-gray-300 text-sm font-medium mb-2", children: "Phone Number" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500", size: 18 }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              value: phone,
              onChange: handlePhoneChange,
              placeholder: "03XXXXXXXXX",
              className: "w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: phone.length < 10 || loading,
            className: "bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Search, { size: 18 }),
              loading ? "Searching..." : "Find"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs mt-2", children: "Enter the phone number you used during checkout" })
    ] }) }),
    reviewingOrder && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/70 backdrop-blur-sm", onClick: () => setReviewingOrder(null) }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-lg w-full max-h-[90vh] overflow-y-auto", children: /* @__PURE__ */ jsx(
        ReviewForm,
        {
          orderId: reviewingOrder.orderId,
          productId: reviewingOrder.item.id,
          productName: reviewingOrder.item.name,
          customerName: ((_a = orders.find((o) => o.id === reviewingOrder.orderId)) == null ? void 0 : _a.customerName) || "",
          customerPhone: phone,
          onSuccess: () => handleReviewSuccess(reviewingOrder.item.id),
          onCancel: () => setReviewingOrder(null)
        }
      ) })
    ] }),
    searched && /* @__PURE__ */ jsx("div", { children: orders.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 max-w-md mx-auto", children: [
      /* @__PURE__ */ jsx(Package, { className: "text-gray-600 mx-auto mb-4", size: 48 }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "No Orders Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-4", children: "We couldn't find any orders with this phone number." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/shop",
          className: "inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400",
          children: "Start Shopping →"
        }
      )
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
        "Found ",
        orders.length,
        " order(s)"
      ] }),
      orders.map((order) => {
        var _a2, _b, _c, _d, _e, _f;
        const StatusIcon = ((_a2 = statusConfig[order.status]) == null ? void 0 : _a2.icon) || Clock;
        const statusColor = ((_b = statusConfig[order.status]) == null ? void 0 : _b.color) || "text-gray-500";
        const statusBg = ((_c = statusConfig[order.status]) == null ? void 0 : _c.bg) || "bg-gray-500/10";
        const statusLabel = ((_d = statusConfig[order.status]) == null ? void 0 : _d.label) || order.status;
        return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-700/50 flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "Order ID" }),
              /* @__PURE__ */ jsx("p", { className: "text-white font-mono text-sm", children: order.id })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "Date" }),
              /* @__PURE__ */ jsx("p", { className: "text-white text-sm", children: formatDate(order.createdAt) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "Total" }),
              /* @__PURE__ */ jsxs("p", { className: "text-yellow-500 font-bold", children: [
                "Rs. ",
                (_e = order.total) == null ? void 0 : _e.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 px-3 py-1.5 rounded-full ${statusBg}`, children: [
              /* @__PURE__ */ jsx(StatusIcon, { size: 16, className: statusColor }),
              /* @__PURE__ */ jsx("span", { className: `text-sm font-medium ${statusColor}`, children: statusLabel })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-4 space-y-4", children: (_f = order.items) == null ? void 0 : _f.map((item, idx) => {
            var _a3;
            const hasReviewed = reviewedItems.has(item.id);
            return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0", children: item.image ? /* @__PURE__ */ jsx("img", { src: item.image, alt: item.name, className: "w-full h-full object-contain p-1" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gray-700", children: /* @__PURE__ */ jsx(Package, { className: "text-gray-500", size: 24 }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-white font-medium truncate", children: item.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm", children: [
                  "Rs. ",
                  (_a3 = item.price) == null ? void 0 : _a3.toLocaleString(),
                  " × ",
                  item.quantity
                ] })
              ] }),
              order.status === "delivered" && /* @__PURE__ */ jsx("div", { children: hasReviewed ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-green-500 text-sm", children: [
                /* @__PURE__ */ jsx(CheckCircle, { size: 16 }),
                "Reviewed"
              ] }) : /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setReviewingOrder({ orderId: order.id, item }),
                  className: "flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors text-sm",
                  children: [
                    /* @__PURE__ */ jsx(Star, { size: 16 }),
                    "Review"
                  ]
                }
              ) })
            ] }, idx);
          }) }),
          order.status !== "delivered" && order.status !== "cancelled" && /* @__PURE__ */ jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Truck, { className: "text-yellow-500 flex-shrink-0 mt-0.5", size: 18 }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsx("p", { className: "text-yellow-500 font-medium", children: "Order in progress" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "You can leave a review once your order is delivered." })
            ] })
          ] }) })
        ] }, order.id);
      })
    ] }) }),
    !searched && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/30 border border-dashed border-gray-700 rounded-xl p-8 max-w-md mx-auto", children: [
      /* @__PURE__ */ jsx(Search, { className: "text-gray-600 mx-auto mb-4", size: 48 }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Track Your Orders" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Enter your phone number above to view your order history, track deliveries, and leave reviews for delivered products." })
    ] }) })
  ] });
};
export {
  MyOrders as default
};
