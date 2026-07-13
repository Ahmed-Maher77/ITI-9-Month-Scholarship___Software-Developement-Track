const userLocks = new Map();

/**
 * Runs a function inside a serialized lock for a specific user ID.
 * This prevents race conditions when modifying user state concurrently.
 * 
 * @param {string} userId - The ID of the user to lock
 * @param {Function} fn - The async function to run
 * @returns {Promise<any>}
 */
export const runWithUserLock = async (userId, fn) => {
    const previous = userLocks.get(userId) || Promise.resolve();
    
    const next = (async () => {
        try {
            await previous;
        } catch (e) {
            // Ignore errors in previous execution to prevent blocking the queue
        }
        return fn();
    })();
    
    userLocks.set(userId, next);
    
    next.finally(() => {
        if (userLocks.get(userId) === next) {
            userLocks.delete(userId);
        }
    });
    
    return next;
};
