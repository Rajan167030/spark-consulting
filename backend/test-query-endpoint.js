// Test script to verify the /query/addquery endpoint
// Run this in terminal: node test-query-endpoint.js

const API_URL = "https://spark-consulting-v1.vercel.app"; // or http://localhost:3000 for local testing

async function testQuerySubmission() {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    contact: "9876543210",
    description: "This is a test query to verify the endpoint is working."
  };

  try {
    console.log("Testing /query/addquery endpoint...");
    console.log(`Sending request to: ${API_URL}/query/addquery`);
    console.log("Data:", testData);
    console.log("---");

    const response = await fetch(`${API_URL}/query/addquery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log("Response Status:", response.status);
    console.log("Response Headers:", {
      contentType: response.headers.get("content-type"),
    });

    const data = await response.json();
    console.log("Response Body:", JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log("✅ Query submitted successfully!");
      console.log("Query ID:", data.queryId);
    } else {
      console.log("❌ Error:", data.message || "Unknown error");
    }
  } catch (error) {
    console.log("❌ Network/Request Error:", error.message);
    console.log("\nPossible causes:");
    console.log("1. Backend server is not running");
    console.log("2. API URL is incorrect");
    console.log("3. CORS configuration issue");
    console.log("4. Database connection issue");
  }
}

testQuerySubmission();
