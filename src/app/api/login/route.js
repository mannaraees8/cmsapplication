import axios from "axios";
import https from "https";

export async function POST(req, res) {
  try {
    const data = await req.json();
    const apiUrl = "https://localhost:7268";
    let email = data.username;
    let password = data.password;
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Disable certificate validation (not recommended for production)
    });

    const response = await axios.post(
      `${apiUrl}/api/Auth/Login`,
      {
        email,
        password,
      },
      { httpsAgent: httpsAgent }
    );
    console.log(response.data, "herererere");
    return new Response(JSON.stringify(response.data));

    // Assuming your authentication service responds with a token
    // Handle the token as needed (store in local storage, context, etc.)
  } catch (error) {
    console.error("Login failed:", error.response.data);
    return new Response(JSON.stringify(error.response.data));
  }
}

// export default async function handler(req, res) {
//   console.log("herereerrr");
//   try {
//     const apiUrl = "https://localhost:7268";
//     const response = await axios.post(
//       `${apiUrl}/api/Auth/Login`,
//       {
//         username,
//         password,
//       },
//       {
//         headers: {
//           "Access-Control-Allow-Origin": "http://localhost:3000",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       }
//     );
//     console.log(response, "herererere");
//     localStorage.setItem("jwttoken", response.token);
//     res.status(200).json(response);

//     // Assuming your authentication service responds with a token
//     // Handle the token as needed (store in local storage, context, etc.)
//   } catch (error) {
//     console.error("Login failed:", error.message);
//     return error.message;
//   }
// }
