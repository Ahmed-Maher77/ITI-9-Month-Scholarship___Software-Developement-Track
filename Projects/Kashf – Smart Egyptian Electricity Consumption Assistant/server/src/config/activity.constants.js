export const ACTIVITY_TYPES = {
    REGISTER: "register",
    LOGIN: "login",
    LOGOUT: "logout",
    PROFILE_UPDATED: "profile_updated",
    PICTURE_UPDATED: "picture_updated",
    GOALS_UPDATED: "goals_updated",
    NOTIFICATION_PREFS_UPDATED: "notification_prefs_updated",
    SCAN_UPLOADED: "scan_uploaded",
    BILL_UPLOADED: "bill_uploaded",
    ALERT_RECEIVED: "alert_received",
    REPORT_DOWNLOADED: "report_downloaded",
    METER_ADDED: "meter_added",
    METER_REMOVED: "meter_removed",
    PASSWORD_CHANGED: "password_changed",
    TWO_FACTOR_ENABLED: "two_factor_enabled",
    TWO_FACTOR_DISABLED: "two_factor_disabled",
    SUBSCRIPTION_SUCCESS: "subscription_success",
    SUBSCRIPTION_EXPIRED: "subscription_expired",
    SUBSCRIPTION_CANCELED: "subscription_canceled",
};

export const ACTIVITY_TYPE_VALUES = Object.values(ACTIVITY_TYPES);
