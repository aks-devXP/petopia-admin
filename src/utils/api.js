// Minimal fetch helper with robust error messages and optional API base
// Set REACT_APP_API_BASE=http://localhost:3456 for dev if not using CRA proxy

// Prefer CRA dev proxy by default. Only use a base URL when explicitly provided.
export const API_BASE = process.env.REACT_APP_API_BASE || "";

function getAuthToken() {
  try {
    const key = process.env.REACT_APP_AUTH_TOKEN_KEY || '';
    if (key && typeof window !== 'undefined') {
      const v = window.localStorage?.getItem(key) || window.sessionStorage?.getItem(key);
      if (v) return v;
    }
    const candidates = ['token', 'accessToken', 'authToken', 'jwt'];
    if (typeof window !== 'undefined') {
      for (const k of candidates) {
        const v = window.localStorage?.getItem(k) || window.sessionStorage?.getItem(k);
        if (v) return v;
      }
    }
  } catch (_) {}
  return '';
}

export async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;

  // Ensure JSON-friendly defaults so CRA proxy doesn't treat it as HTML navigation
  const headers = new Headers(options.headers || {});
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  // If sending a body that's not FormData, default to JSON content-type
  const hasBody = options.body !== undefined && options.body !== null;
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (hasBody && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  // Inject Authorization header if available and not already set
  if (!headers.has('Authorization')) {
    const token = getAuthToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const fetchOpts = { ...options, headers };
  let res;
  try {
    res = await fetch(url, fetchOpts);
  } catch (e) {
    // Network-level failure: server down, CORS blocked, DNS, or mixed content
    const hint = API_BASE
      ? `Check that ${API_BASE} is reachable and CORS allows http://localhost:3000.`
      : `If using CRA proxy, ensure dev server was restarted after adding \"proxy\" in package.json; otherwise set REACT_APP_API_BASE.`;
    throw new Error(`Network error while requesting ${url}: ${e?.message || e}. ${hint}`);
  }
  const contentType = res.headers.get("content-type") || "";

  // Parse JSON responses; otherwise capture text for diagnostics
  let payload;
  if (contentType.includes("application/json")) {
    try {
      payload = await res.json();
    } catch (e) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Failed to parse JSON (status ${res.status}). Body: ${txt.slice(0, 200)}`);
    }
  } else {
    const text = await res.text().catch(() => "");
    const snippet = text.slice(0, 200).replace(/\s+/g, " ");
    if (!res.ok) {
      const advisory = res.status === 404
        ? ` (Did the CRA dev proxy start? Or set REACT_APP_API_BASE to your API, e.g. http://localhost:3456)`
        : "";
      throw new Error(`HTTP ${res.status} ${res.statusText} – Non-JSON response from ${url}: ${snippet}${advisory}`);
    }
    // Non-JSON and OK (likely HTML from wrong origin/proxy)
    throw new Error(
      `Unexpected content-type: ${contentType || "unknown"}. Sample: ${snippet}`
    );
  }

  if (!res.ok) {
    const msg = (payload && (payload.message || payload.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return payload;
}
