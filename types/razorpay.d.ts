export {};

/**
 * Minimal shape of the `window.Razorpay` global injected by
 * https://checkout.razorpay.com/v1/checkout.js, loaded client-side in
 * components/booking/steps/PaymentStep.tsx.
 */
declare global {
  interface RazorpayCheckoutOptions {
    key: string;
    amount: number;
    currency: string;
    order_id: string;
    name?: string;
    description?: string;
    prefill?: { name?: string; email?: string; contact?: string };
    theme?: { color?: string };
    handler?: (response: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => void;
    modal?: { ondismiss?: () => void };
  }

  interface RazorpayCheckoutInstance {
    open: () => void;
  }

  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
  }
}
