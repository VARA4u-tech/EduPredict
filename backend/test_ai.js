console.log("🚀 Testing AI Chat API...");

const testAI = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Hello! If you can read this, say 'Connection Successful'",
        context: "student",
      }),
    });

    console.log(`📡 Status Code: ${response.status}`);

    const data = await response.json();
    console.log("\n📦 Response Data:");
    console.log(JSON.stringify(data, null, 2));

    if (data.success) {
      console.log("\n✅ SUCCESS: API Key is working!");
    } else {
      console.log("\n❌ FAIL: API Error detected.");
      if (data.error && data.error.includes("key")) {
        console.log("👉 Cause: Invalid API Key");
      }
    }
  } catch (error) {
    console.error("\n❌ CONNECTION ERROR:", error.message);
    console.log("👉 Make sure the backend server is running on port 5000");
  }
};

testAI();
