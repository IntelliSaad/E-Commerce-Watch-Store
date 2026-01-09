// src/utils/security.ts

/**
 * Security Utilities for Input Sanitization
 * Prevents XSS and injection attacks
 */

/**
 * Sanitize text input by removing potentially dangerous characters
 * Use for names, addresses, etc.
 */
export const sanitizeText = (input: string, maxLength: number = 200): string => {
    if (!input) return '';

    // Remove HTML tags and scripts
    let sanitized = input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim();

    // Limit length
    return sanitized.substring(0, maxLength);
};

/**
 * Validate and sanitize phone number
 * Returns null if invalid
 */
export const validatePhone = (phone: string): string | null => {
    if (!phone) return null;

    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');

    // Pakistan phone numbers are typically 10-11 digits
    if (cleaned.length < 10 || cleaned.length > 11) {
        return null;
    }

    return cleaned;
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
    if (!email) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 100;
};

/**
 * Sanitize multiline text (for reviews, messages)
 * More permissive than sanitizeText but still safe
 */
export const sanitizeMultiline = (input: string, maxLength: number = 1000): string => {
    if (!input) return '';

    let sanitized = input
        .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
        .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '') // Remove iframes
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim();

    return sanitized.substring(0, maxLength);
};

/**
 * Validate file upload
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB (before compression)

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'Image must be less than 10MB' };
    }

    return { valid: true };
};

/**
 * Rate limiting tracker (client-side)
 * Prevents spam submissions
 */
const rateLimitMap = new Map<string, number[]>();

export const checkRateLimit = (
    key: string,
    maxAttempts: number = 3,
    windowMs: number = 60000 // 1 minute
): boolean => {
    const now = Date.now();
    const attempts = rateLimitMap.get(key) || [];

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < windowMs);

    if (recentAttempts.length >= maxAttempts) {
        return false; // Rate limit exceeded
    }

    // Add current attempt
    recentAttempts.push(now);
    rateLimitMap.set(key, recentAttempts);

    return true;
};
