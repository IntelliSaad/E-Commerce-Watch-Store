import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { d as db, b as uploadImageSecure } from "../index.mjs";
import { getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft, Palette, Trash2, RefreshCw, UploadCloud, Plus } from "lucide-react";
import { c as compressImage } from "./imageOptimizer-CONHIO2n.js";
import "vite-react-ssg";
import "firebase/auth";
import "firebase/app";
import "react-helmet-async";
import "@vercel/analytics/react";
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("Male");
  const [isFeatured, setIsFeatured] = useState(false);
  const [variants, setVariants] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [currentImages, setCurrentImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const docSnap = await getDoc(doc(db, "products", id));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProductName(data.name || "");
          setOriginalPrice(data.originalPrice || data.price);
          setDiscountPercentage(data.discount || 0);
          setStock(data.stock || 0);
          setDescription(data.description || "");
          setBrand(data.brand || "");
          setGender(data.gender || "Male");
          setIsFeatured(data.isFeatured || false);
          setVariants(data.variants || []);
          if ((!data.variants || data.variants.length === 0) && data.imageUrls) {
            setVariants([{ color: "Standard", images: data.imageUrls }]);
          }
        } else {
          alert("Product not found!");
          navigate("/admin/inventory");
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [id, navigate]);
  const finalPrice = useMemo(() => {
    const priceVal = Number(originalPrice);
    const discountVal = Number(discountPercentage);
    if (isNaN(priceVal) || priceVal <= 0) return 0;
    return Math.round(priceVal * (1 - discountVal / 100));
  }, [originalPrice, discountPercentage]);
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const files = e.target.files;
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          try {
            setUploadProgress(`Uploading ${file.name}...`);
            const compressedFile = await compressImage(file);
            const url = await uploadImageSecure(compressedFile, void 0);
            if (url) {
              uploadedUrls.push(url);
            } else {
              alert(`Failed to upload ${file.name} via secure server`);
            }
          } catch (err) {
            console.error("Error processing file", file.name, err);
            alert(`Error: ${err instanceof Error ? err.message : String(err)}`);
          }
        }
      }
      setCurrentImages([...currentImages, ...uploadedUrls]);
      setUploading(false);
      setUploadProgress("");
    }
  };
  const handleAddVariant = () => {
    if (!currentColor || currentImages.length === 0) {
      alert("Add color name and images.");
      return;
    }
    setVariants([...variants, { color: currentColor, images: currentImages }]);
    setCurrentColor("");
    setCurrentImages([]);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "products", id), {
        name: productName,
        originalPrice: Number(originalPrice),
        discount: Number(discountPercentage),
        price: finalPrice,
        stock: Number(stock),
        description,
        brand,
        gender,
        isFeatured,
        variants,
        imageUrls: variants.length > 0 ? variants[0].images : [],
        updatedAt: serverTimestamp()
      });
      setMessage({ type: "success", text: "Product updated successfully!" });
      setTimeout(() => navigate("/admin/inventory"), 1500);
    } catch (error) {
      setMessage({ type: "error", text: "Error updating: " + error.message });
    } finally {
      setSaving(false);
    }
  };
  const inputStyle = "w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none";
  const labelStyle = "block text-gray-300 mb-2 font-bold text-sm uppercase tracking-wide";
  if (loadingData) return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center text-white", children: "Loading Product Data..." });
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6 border-b border-gray-700 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => navigate("/admin/inventory"), className: "mr-4 p-2 bg-gray-700 rounded-full hover:bg-gray-600 text-white", children: /* @__PURE__ */ jsx(ArrowLeft, { size: 20 }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Edit Product" })
    ] }) }),
    message && /* @__PURE__ */ jsx("div", { className: `p-4 mb-6 rounded-lg text-center font-bold ${message.type === "success" ? "bg-green-900/50 text-green-200" : "bg-red-900/50 text-red-200"}`, children: message.text }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Product Name" }),
        /* @__PURE__ */ jsx("input", { type: "text", value: productName, onChange: (e) => setProductName(e.target.value), className: inputStyle })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Original Price" }),
          /* @__PURE__ */ jsx("input", { type: "number", value: originalPrice, onChange: (e) => setOriginalPrice(Number(e.target.value)), className: inputStyle })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Discount %" }),
          /* @__PURE__ */ jsx("input", { type: "number", value: discountPercentage, onChange: (e) => setDiscountPercentage(Number(e.target.value)), className: inputStyle })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Final Price" }),
          /* @__PURE__ */ jsxs("div", { className: "h-[50px] flex items-center px-4 rounded bg-gray-700 border border-gray-600 text-green-400 font-bold text-lg", children: [
            "Rs. ",
            finalPrice.toLocaleString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Stock" }),
          /* @__PURE__ */ jsx("input", { type: "number", value: stock, onChange: (e) => setStock(Number(e.target.value)), className: inputStyle })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Brand" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: brand, onChange: (e) => setBrand(e.target.value), className: inputStyle })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Gender" }),
          /* @__PURE__ */ jsxs("select", { value: gender, onChange: (e) => setGender(e.target.value), className: inputStyle, children: [
            /* @__PURE__ */ jsx("option", { value: "Male", children: "Male ♂️" }),
            /* @__PURE__ */ jsx("option", { value: "Female", children: "Female ♀️" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 bg-gray-700/30 p-3 rounded border border-gray-600", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: isFeatured, onChange: (e) => setIsFeatured(e.target.checked), className: "h-5 w-5 text-yellow-500" }),
        /* @__PURE__ */ jsx("label", { className: "text-gray-300", children: "Mark as Featured" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Description" }),
        /* @__PURE__ */ jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), rows: 4, className: inputStyle })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 p-6 rounded-xl border border-gray-600", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-yellow-500 font-bold mb-4 flex items-center text-lg", children: [
          /* @__PURE__ */ jsx(Palette, { className: "mr-2" }),
          " Variants"
        ] }),
        variants.map((v, idx) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-gray-700 p-3 rounded mb-2 border border-gray-600", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
            v.color,
            " (",
            v.images.length,
            " imgs)"
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setVariants(variants.filter((_, i) => i !== idx)), className: "text-red-400 hover:text-red-300", children: /* @__PURE__ */ jsx(Trash2, { size: 18 }) })
        ] }, idx)),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700", children: [
          /* @__PURE__ */ jsx("input", { type: "text", value: currentColor, onChange: (e) => setCurrentColor(e.target.value), className: inputStyle, placeholder: "New Color Name" }),
          /* @__PURE__ */ jsxs("label", { className: "cursor-pointer flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition", children: [
            uploading ? /* @__PURE__ */ jsx(RefreshCw, { className: "animate-spin mr-2", size: 20 }) : /* @__PURE__ */ jsx(UploadCloud, { className: "mr-2", size: 20 }),
            uploading ? uploadProgress : "Upload Images",
            /* @__PURE__ */ jsx("input", { type: "file", multiple: true, onChange: handleFileChange, className: "hidden", disabled: uploading })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleAddVariant, className: "w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2" }),
          " Add Variant"
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: saving, className: "w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-extrabold py-4 rounded-xl text-lg shadow-xl mt-6 transition-transform hover:scale-[1.01]", children: saving ? "Saving Changes..." : "UPDATE PRODUCT" })
    ] })
  ] });
};
export {
  EditProduct as default
};
