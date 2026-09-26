import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const weatherImages = {
  clear:
    "https://img.magnific.com/free-photo/beautiful-photo-sea-waves_58702-11169.jpg?semt=ais_hybrid&w=740&q=80",
  clouds:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Cloudy_sky_%2826171935906%29.jpg/1280px-Cloudy_sky_%2826171935906%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
  rain: "https://static.vecteezy.com/system/resources/thumbnails/053/905/043/small/rain-cascades-down-lush-green-leaves-creating-a-peaceful-atmosphere-in-the-forest-during-a-quiet-afternoon-photo.jpg",
  thunderstorm:
    "https://www.childcareaware.org/wp-content/smush-webp/2024/06/Shutterstock_2422367917-1024x524.png.webp",
  snow: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=900&q=80",
  mist: "https://static.wikia.nocookie.net/weather/images/f/fc/Fog.jpeg/revision/latest?cb=20120804193216",
  default:
    "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=900&q=80",
};

function getWeatherImage(info) {
  if (!info) return weatherImages.default;

  const { temp, humidity } = info;

  if (temp <= 5) return weatherImages.snow;
  if (humidity >= 90) return weatherImages.rain;
  if (humidity >= 60) return weatherImages.clouds;
  if (temp >= 30) return weatherImages.clear;
  if (humidity > 60 || temp < 10) return weatherImages.mist;

  return weatherImages.default;
}

export default function InfoBox({ info }) {
  const weatherImage = getWeatherImage(info);
  const imageKey = `${info?.temp ?? "default"}-${info?.humidity ?? "default"}`;

  return (
    <div
      className="Infobox"
      style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
    >
      <Card
        sx={{ maxWidth: 345, width: "100%", borderRadius: 3, boxShadow: 3 }}
      >
        <CardMedia
          key={imageKey}
          component="img"
          alt={info?.weather || "Weather scenery"}
          height="140"
          image={weatherImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            {info.weather}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Temperature: {info.temp}°C
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Feels like: {info.feelsLike}°C
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Humidity: {info.humidity}%
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Min: {info.tempMin}°C / Max: {info.tempMax}°C
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Refresh</Button>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>
    </div>
  );
}
