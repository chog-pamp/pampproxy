export default async function handler(req, res) {
  // Handle CORS Preflight Requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Custom-Headers");
    return res.status(204).end();
  }

  try {
    // Extract target URL from query parameters
    const { url } = req.query;
    if (!url || !url.startsWith("http")) {
      return res.status(400).json({ error: "Invalid or missing URL parameter" });
    }

    // Define default headers
    const defaultHeaders = {
      "User-Agent": "Mozilla/5.0 (compatible; ProxyServer/1.0)",
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
    };

    // Extract custom headers from the request
    const customHeaders = req.headers["custom-headers"]
      ? JSON.parse(req.headers["custom-headers"])
      : {};

    // Merge default headers with custom headers, prioritizing custom headers
    const headers = { ...defaultHeaders, ...customHeaders };

    // Prepare the fetch options
    const fetchOptions = {
      method: req.method,
      headers: headers,
      body: req.method !== "GET" && req.method !== "OPTIONS" ? req.body : undefined,
    };

    // Make the fetch request to the target URL
    const response = await fetch(url, fetchOptions);

    // Forward response headers and body to the client
    const body = await response.text(); // Read the response body as text
    const responseHeaders = {};

    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // Forward cookies if present
    if (responseHeaders["set-cookie"]) {
      res.setHeader("Set-Cookie", responseHeaders["set-cookie"]);
    }

    // Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Custom-Headers");

    // Forward the status and body
    res.status(response.status).send(body);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }
}
