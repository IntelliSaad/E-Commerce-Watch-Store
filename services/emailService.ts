// src/services/emailService.ts
import emailjs from '@emailjs/browser';

interface OrderEmailData {
    orderNumber: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    customerCity: string;
    paymentMethod: string;
    totalAmount: number;
    items: Array<{ name: string; quantity: number; price: number }>;
}

export const sendOrderNotificationEmail = async (orderData: OrderEmailData): Promise<boolean> => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If EmailJS is not configured, skip silently
    if (!serviceId || !templateId || !publicKey) {
        console.log('EmailJS not configured - skipping email notification');
        return false;
    }

    // Format items list for email
    const itemsList = orderData.items
        .map(item => `${item.name} x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`)
        .join('\n');

    const templateParams = {
        order_number: orderData.orderNumber,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail || 'Not provided',
        customer_phone: orderData.customerPhone,
        customer_address: `${orderData.customerAddress}, ${orderData.customerCity}`,
        payment_method: orderData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Bank/Easypaisa',
        total_amount: `Rs. ${orderData.totalAmount.toLocaleString()}`,
        items_list: itemsList,
    };

    try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('Order notification email sent successfully');
        return true;
    } catch (error) {
        console.error('Failed to send order notification email:', error);
        return false;
    }
};
