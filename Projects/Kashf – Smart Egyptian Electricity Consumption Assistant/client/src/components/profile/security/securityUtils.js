export const parseUA = (ua, t) => {
  if (!ua) return t("security.devicesModal.unknown", { defaultValue: "Unknown Device" });
  let os = "Unknown OS";
  let browser = "Unknown Browser";

  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Macintosh") || ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edge")) browser = "Edge";
  else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";

  return `${browser} on ${os}`;
};
