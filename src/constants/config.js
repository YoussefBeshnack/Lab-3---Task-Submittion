// ==================================================
// 1. STUN SERVER CONFIGURATIONS
// ==================================================
export const CONFIGS = {
    none: [],
    stun: [{ urls: "stun:stun.l.google.com:19302" }],
    wrong: [{ urls: "stun:stun.invalid.example:3478" }]
};

// ==================================================
// 2. CANDIDATE COLORS
// ==================================================
export const COLORS = {
    host: "#d5f0ec",
    srflx: "#fdecc8",
    relay: "#fbd9cf"
};
