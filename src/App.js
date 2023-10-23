import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [city, setCity] = useState("Lahore");
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setInput("");
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const fetchWeather = (name) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=495c16bf9a0ac87f9a9f64850b6a6cb3`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      {data && (
        <div>
          <h2>Weather in {data.name}</h2>
          <p>Temperature: {data.main.temp} °C</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
      )}
    </>
  );
}

export default App;
