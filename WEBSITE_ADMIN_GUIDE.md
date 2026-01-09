# Website Administration & Optimization Guide

## 👋 Welcome!
This guide will help you manage the WristHub website content efficiently.

---

## 📸 1. Image Management (Crucial for Speed)
To ensure the website loads instantly for customers, follow these rules when updating product photos.

### **Step A: Delete Old Images**
Before adding new stock, remove old, unused images to keep the server clean.
1. Go to your image hosting or project folder.
2. DELETE images of watches that are no longer in stock.
3. **Why?** Too many unused files slow down backups and confuse the system.

### **Step B: Upload New Images**
1. **Take Clear Photos**: Ensure good lighting.
2. **Optimize Before Uploading**:
   - ⚠️ **DO NOT** upload raw camera structure (e.g., 5MB+ files).
   - Use a tool like [TinyPNG](https://tinypng.com/) to compress images.
   - Keep file size **under 200KB** per image if possible.
3. **Upload**: Use the **Add Product** page to upload your consolidated images.

---

## 🔗 2. Quick Access Links
Bookmark these for easy access:

| Page | Description | Link |
| :--- | :--- | :--- |
| **🏠 Home** | Main landing page | [Visit Home](http://localhost:5173/) |
| **🛍️ Shop** | Browse all watches | [Visit Shop](http://localhost:5173/shop) |
| **➕ Add Product** | Admin tool for new stock | [Add Product](http://localhost:5173/admin/add-product) |
| **📦 Orders** | View customer orders | [View Orders](http://localhost:5173/admin/orders) |
| **📞 Contact** | Customer inquiries | [Contact Page](http://localhost:5173/contact) |
| **📝 Reviews** | Customer testimonials | [Reviews](http://localhost:5173/reviews) |

> **Note**: If the website is deployed (e.g., on Vercel or Netlify), replace `http://localhost:5173` with your actual domain name (e.g., `https://wristhub.pk`).

---

## 🚀 3. Performance Tips
- **Videos**: If uploading videos, keep them short (under 10s) and mute them by default.
- **Descriptions**: Keep product descriptions concise.
- **Cache**: If you don't see changes immediately, try refreshing the page with `Ctrl + F5`.
