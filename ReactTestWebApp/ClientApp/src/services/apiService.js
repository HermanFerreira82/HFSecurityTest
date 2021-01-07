import axios from "axios";

async function getDataFromApi() {
  const response = await axios.get("https://localhost:6001/WeatherForecast");
  return response.data;
}

export { getDataFromApi };
