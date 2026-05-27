const AUTH_STORAGE_KEY = "tech_news_auth";
const USERS_STORAGE_KEY = "tech_news_users";
const AUTH_CHANGED_EVENT = "authChanged";

function parseJson(value, fallback) {
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

export function getStoredUsers() {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    const users = parseJson(raw, []);
    return Array.isArray(users) ? users : [];
}

export function saveStoredUsers(users) {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function getStoredAuth() {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    const auth = parseJson(raw, null);
    if (!auth || typeof auth !== "object") return null;
    if (!auth.isLoggedIn || !auth.role || !auth.email) return null;
    return auth;
}

export function saveStoredAuth(auth) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearStoredAuth() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function registerUser({
    name,
    email,
    password,
    role = "user",
    userPic = "",
}) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const exists = users.some((user) => user.email === normalizedEmail);
    if (exists) {
        return { ok: false, message: "Email already registered." };
    }

    const newUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
        role,
        userPic,
    };
    saveStoredUsers([...users, newUser]);
    return { ok: true, user: newUser };
}

export function loginUser({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const user = users.find(
        (candidate) =>
            candidate.email === normalizedEmail &&
            candidate.password === password,
    );
    if (!user) {
        return { ok: false, message: "Invalid email or password." };
    }
    return { ok: true, user };
}

export function getAuthChangedEventName() {
    return AUTH_CHANGED_EVENT;
}
