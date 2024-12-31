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
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4692.71 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
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

    // Copy response headers
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // Extract and forward cookies if present
    if (responseHeaders["set-cookie"]) {
      res.setHeader("Set-Cookie", responseHeaders["set-cookie"]);
    }

    // Add CORS headers to the response
    responseHeaders["Access-Control-Allow-Origin"] = "*";
    responseHeaders["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    responseHeaders["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Custom-Headers";

    // Stream the response back to the client
    res.writeHead(response.status, responseHeaders);
    response.body?.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
