const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*', // Allow frontend to access
    methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '10mb' })); // Allow larger payloads for images

// ==========================================
// ROUTES
// ==========================================

// Health Check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'WristHub Backend is running' });
});

// 1. Image Upload Endpoint (ImgBB)
app.post('/upload-image', async (req, res) => {
    try {
        const { imageBase64 } = req.body; // Expecting base64 string (without data:image/... prefix)

        if (!imageBase64) {
            return res.status(400).json({ success: false, error: 'No image provided' });
        }

        // Mock mode: If no key provided, return dummy response
        if (process.env.IMGBB_API_KEY === 'placeholder_key_here' || !process.env.IMGBB_API_KEY) {
            console.warn('Real ImgBB Key missing, returning mock response');
            return res.json({
                success: true,
                data: {
                    url: 'https://i.ibb.co/wzn25hP/placeholder-watch.jpg' // Dummy image
                }
            });
        }

        // Real ImgBB Call
        const params = new URLSearchParams();
        params.append('key', process.env.IMGBB_API_KEY);

        const formData = new URLSearchParams();
        formData.append('image', imageBase64);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            res.json({ success: true, data: { url: data.data.url } });
        } else {
            console.error('ImgBB Error:', data);
            res.status(500).json({ success: false, error: 'Failed to upload image' });
        }

    } catch (error) {
        console.error('Server Upload Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 2. Chatbot Endpoint (Gemini/OpenAI Placeholder)
// 2. Chatbot Endpoint (Gemini AI)
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message required' });
        }

        // Check if API key is configured
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'placeholder_key_here') {
            console.warn("Gemini API Key missing or invalid.");
            return res.json({
                reply: "I am currently in maintenance mode. Please add a valid GEMINI_API_KEY to the backend .env file to enable my AI brain! 🧠"
            });
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // "gemini-flash-latest" is a stable alias that points to the best available Flash model for your key
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Context Prompt
        const contextPrompt = `
        You are ChronoBot, the AI assistant for WristHub (formerly Chronopk), a premium watch store in Pakistan.
        
        CRITICAL RULES:
        1. **Price Range Queries**:
           - If a user asks for watches under a specific price (e.g., "under 15000"), **DO NOT invent specific watch names**.
           - Instead, say: "We have excellent options in that range."
           - **IMMEDIATELY tell them to visit the Shop page** to see the full collection sorted by price.
        2. **Call to Action**:
           - **Shop Page**: Always mention "You can view our full collection on the Shop page."
           - **WhatsApp**: For specific stock or video inquiries, say: "For live videos or specific availability, please **WhatsApp us directly** via the Contact page."
        3. **Conciseness**: Keep answers under 3 sentences.
        4. **Formatting**: Use Markdown bullet points.
        5. **Pricing Fact**: We have watches starting from PKR 3,000.

        Store Info:
        - Name: WristHub
        - Policies: Cash on Delivery, 7-day returns.
        - Contact: wristhubstore@gmail.com, +923155308406.
        
        User Message: ${message}
        `;

        const result = await model.generateContent(contextPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("Gemini API Error:", error);

        // Handle Rate Limits (429) gracefully
        if (error.message.includes('429') || error.status === 429) {
            return res.json({
                reply: "Brain overload! 🤯 I'm receiving too many messages right now. Please wait 30 seconds and try again."
            });
        }

        // Handle Model Not Found (404) gracefully
        if (error.message.includes('404')) {
            return res.json({
                reply: "System Upgrade: My AI model is currently updating. Please check back later."
            });
        }

        res.status(500).json({ error: 'Failed to process AI response' });
    }
});

// 3. Admin Route Placeholder
app.post('/admin/verify', (req, res) => {
    const { secret } = req.body;
    if (secret === process.env.ADMIN_SECRET) {
        res.json({ verified: true });
    } else {
        res.status(403).json({ verified: false });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Secure Backend Server running on http://localhost:${PORT}`);
    console.log(`Context: ${process.env.IMGBB_API_KEY ? 'Keys Loaded' : 'No Keys (Mock Mode)'}`);
});
