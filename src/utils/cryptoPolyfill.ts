// src/utils/cryptoPolyfill.ts

// This polyfill provides a fallback for crypto.randomUUID if it's not available
// in the current environment, which can happen in older browsers or specific runtimes.
if (typeof crypto !== 'undefined' && !crypto.randomUUID) {
  console.warn("crypto.randomUUID is not natively available. Using a fallback polyfill.");
  // A simple UUID v4 generation (not cryptographically strong without a proper random source,
  // but sufficient for general ID generation when native randomUUID is missing).
  // For browser environments, Math.random() is generally acceptable for non-security-critical UUIDs.
  crypto.randomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }) as `${string}-${string}-${string}-${string}-${string}`;
  };
}