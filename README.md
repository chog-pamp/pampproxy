# 🌐 PampProxy

A simple, free-to-use proxy that bypasses API restrictions and CORS rules, designed for use from static websites or other applications. This proxy allows users to fetch resources from external APIs without worrying about CORS issues or needing API keys. 

> **License**: This project is licensed under the [GNU General Public License v3.0 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.html). You are free to use, modify, and redistribute the code as long as your work remains open source under the same license.

---

## 🚀 Features

- **Free and Open Source**: No API keys or payments are required. Anyone can use it!
- **CORS Support**: Automatically handles CORS headers and preflight requests.
- **Custom Headers**: Pass custom headers for APIs that require authentication or other special headers.
- **All HTTP Methods**: Supports `GET`, `POST`, `PUT`, `DELETE`, and `OPTIONS`.
- **Easy Deployment**: Deployable on [Vercel](https://vercel.com/) in minutes.
- **Highly Configurable**: Modify the proxy to suit your needs or extend its functionality.
- **Open Collaboration**: Fork, edit, and contribute as long as your work stays open source.

---

## 📖 How It Works

The proxy receives requests from your frontend, forwards them to the desired API or resource URL, and then relays the response back to your application. It also:

1. Adds CORS headers to ensure the browser allows your request.
2. Supports passing custom headers for authentication or other needs.
3. Can be hosted on Vercel as a serverless function.

---

## 🛠️ Technologies Used

- **Node.js**: Backend environment for running JavaScript.
- **Vercel Serverless Functions**: Hosting the proxy logic with zero configuration deployment.
- **Native Fetch API**: For making HTTP requests from the server to the target URL.
- **GNU GPL v3 License**: Ensures the project remains open and accessible to all.

---

## 📋 Usage Guide

### **Step 1: Use the Proxy**
To use the proxy, send a request to:
```
https://your-vercel-app.vercel.app/api/proxy?url=<TARGET_URL>
```

#### Example: Fetch data
```javascript
async function fetchData() {
  const targetUrl = "https://api.example.com/data";
  const proxyUrl = `https://your-vercel-app.vercel.app/api/proxy?url=${encodeURIComponent(targetUrl)}`;

  const response = await fetch(proxyUrl, {
    method: "GET",
    headers: {
      "Custom-Headers": JSON.stringify({
        Authorization: "Bearer YOUR_API_KEY",
      }),
    },
  });

  const data = await response.json();
  console.log(data);
}
fetchData();
```
#### Example: Send a login request and save cookie from login
```javascript
async function loginAndGetCookie() {
  // Target login endpoint (the API you want to log in to)
  const targetUrl = "https://example.com/api/login";

  // Proxy endpoint
  const proxyUrl = `https://your-vercel-app.vercel.app/api/proxy?url=${encodeURIComponent(targetUrl)}`;

  // Send a POST request through the proxy
  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Use Custom-Headers to specify headers passed to the login endpoint
      "Custom-Headers": JSON.stringify({
        "X-Requested-With": "XMLHttpRequest", // Example custom header
      }),
    },
    body: JSON.stringify({
      username: "your-username", // Replace with actual credentials
      password: "your-password",
    }),
    credentials: "include", // Ensures cookies are sent back to your frontend
  });

  // Check if login succeeded
  if (response.ok) {
    console.log("Login successful.");
  } else {
    console.error("Login failed. Status:", response.status);
  }

  // Access cookies in the browser
  const cookies = document.cookie; // Browser cookies will now include the session cookie
  console.log("Cookies:", cookies);
}

loginAndGetCookie();

```

### **Step 2: Customize the Proxy**
You can fork this repository and deploy your customized version. The code is open source, so feel free to modify it for your needs.

---

## 🛠️ Deployment Guide

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chog-pamp/pampproxy.git
   cd pampproxy
   ```

2. **Deploy to Vercel**:
   - Install the Vercel CLI: 
     ```bash
     npm install -g vercel
     ```
   - Deploy:
     ```bash
     vercel deploy
     ```

3. Your proxy will be live at:
   ```
   https://<your-vercel-project>.vercel.app/api/proxy
   ```

---

## 🧑‍🤝‍🧑 Contribution

Contributions are welcome! If you have ideas for improvements, feel free to:
1. Fork this repository.
2. Make your changes.
3. Submit a pull request.

Please ensure your contributions comply with the **GNU GPL v3** license.

---

## 📜 License

This project is licensed under the [GNU General Public License v3.0 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.html).

### Key Terms:
- **Free to Use**: Anyone can use this proxy without an API key.
- **Open Source Forever**: You can modify, share, and redistribute the code. However, any derivative work must also remain open source under the same license.

---

## 🤝 Acknowledgments

Thank you to everyone who supports the open-source community! Your collaboration helps build a more accessible internet for everyone.
