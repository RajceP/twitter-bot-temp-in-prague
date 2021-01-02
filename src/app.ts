import axios from 'axios';
import dotenv from 'dotenv';
import Twit from 'twit';

dotenv.config();

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY!,
  consumer_secret: process.env.CONSUMER_SECRET!,
  access_token: process.env.ACCESS_TOKEN!,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET!,
});

const getTemperature = async () => {
  const weatherUrl = 'https://www.metaweather.com/api/location/796597/';
  const temp = await axios
    .get(weatherUrl)
    .then((res: any) => res.data.consolidated_weather[0].the_temp);

  return (Math.round(temp * 100) / 100).toFixed(2);
};

const tweetTemperature = async () => {
  const temp = await getTemperature();
  T.post('statuses/update', { status: `${temp} °C` }, (_err, data: any) => {
    console.log(data);
  });
};

tweetTemperature();
