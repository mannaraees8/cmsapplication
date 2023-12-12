import axios from "axios";
import https from "https";

export async function POST(req, res) {
  try {
    // Extract data from the request body
    const { token, id } = await req.json();
    console.log(id, "hererererer");
    // Define the API URL
    const apiUrl = "https://localhost:7268";

    // Create an HTTPS agent to handle self-signed certificates
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Disable certificate validation (not recommended for production)
    });

    // Make the DELETE request to the API
    const response = await axios.delete(`${apiUrl}/api/Customer/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      httpsAgent: httpsAgent,
    });

    // Log the response data
    // Return a JSON response with the data
    return new Response(response);
  } catch (error) {
    // Log and return an error response
    console.error("DELETE request failed:", error);
    return new Response(error);
  }
}
