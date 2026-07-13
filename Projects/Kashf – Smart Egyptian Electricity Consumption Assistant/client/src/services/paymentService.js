import { apiFetch, parseApiResponse } from "./apiClient";

/**
 * Initiates checkout session for a given target plan
 */
export const payForPlan = async (targetPlan) => {
    const response = await apiFetch("/api/payments/pay-for-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPlan }),
    });

    return parseApiResponse(response, "Checkout initiation failed.");
};

/**
 * Fetches user's payment history
 */
export const fetchPaymentHistory = async () => {
    const response = await apiFetch("/api/payments/history", {
        method: "GET",
    });

    const result = await parseApiResponse(response, "Failed to load billing history.");
    return result.data || [];
};

/**
 * Verifies user's checkout session status
 */
export const verifyCheckout = async (sessionId) => {
    const response = await apiFetch(`/api/payments/verify-checkout?session_id=${sessionId}`, {
        method: "GET",
    });

    return parseApiResponse(response, "Checkout verification failed.");
};

/**
 * Removes the user's saved payment method
 */
export const removePaymentMethod = async () => {
    const response = await apiFetch("/api/payments/payment-method", {
        method: "DELETE",
    });

    return parseApiResponse(response, "Failed to remove payment method.");
};

/**
 * Cancels the user's active subscription and reverts to the Free plan
 */
export const cancelSubscription = async () => {
    const response = await apiFetch("/api/payments/cancel-subscription", {
        method: "POST",
    });

    return parseApiResponse(response, "Subscription cancellation failed.");
};

const paymentService = {
    payForPlan,
    fetchPaymentHistory,
    verifyCheckout,
    removePaymentMethod,
    cancelSubscription
};

export default paymentService;
