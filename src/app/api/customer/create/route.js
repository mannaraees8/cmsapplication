import axios from "axios";
import https from "https";

export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log(data, "hereerer");
    const apiUrl = "https://localhost:7268";
    let token = data.token;
    let putData = data.data;
    console.log(token, "hererer");
    console.log(putData, "hererer");
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Disable certificate validation (not recommended for production)
    });

    const response = await axios.post(
      `${apiUrl}/api/Customer`,
      JSON.stringify(putData),
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        httpsAgent: httpsAgent,
      }
    );
    console.log(response?.data, "herererere");
    return new Response(JSON.stringify(response?.data));

    // Assuming your authentication service responds with a token
    // Handle the token as needed (store in local storage, context, etc.)
  } catch (error) {
    console.error("Login failed:", error.response);
    return new Response(error.response?.status);
  }
}
