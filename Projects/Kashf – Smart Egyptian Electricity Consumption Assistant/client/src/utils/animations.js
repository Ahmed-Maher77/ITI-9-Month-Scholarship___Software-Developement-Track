/**
 * Shared Framer Motion animation variants for components.
 * Keeping these centralized ensures consistent animations across the application
 * and reduces component boilerplate.
 */

export const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

export const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const glowVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }
};

export const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    show: (custom) => {
        // If custom is an object, extract i and baseDelay
        // If custom is a number, it's just the index i
        const isObj = typeof custom === 'object' && custom !== null;
        const i = isObj && custom.i !== undefined ? custom.i : (isObj ? 0 : custom || 0);
        const baseDelay = isObj && custom.baseDelay !== undefined ? custom.baseDelay : 0.15;
        
        return {
            opacity: 1,
            y: 0,
            transition: { delay: baseDelay + (i * 0.15), duration: 0.6, ease: "easeOut" }
        };
    }
};

export const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
