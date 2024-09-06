import Axios from "axios";
import FormData from "form-data";

export async function POST(req) {
  try {
    const body = await req.json();

    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });

    const response = await Axios.post("http://5.tcp.ngrok.io:21289/get_event_data", formData, {
      headers: formData.getHeaders(), // Use formData's headers
    });

    return new Response(JSON.stringify({ message: "Success", data: response.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error receiving message:", error);

    return new Response(JSON.stringify({ message: "Error", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
