import axios from 'axios';
import dotenv from 'dotenv';
import Twit from 'twit';
import express from 'express';

const app = express();
dotenv.config();

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Bot listening on port ${port}`);
});

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

  return temp;
};

const tweetTemperature = async () => {
  const temp = await getTemperature();
  T.post('statuses/update', { status: `${temp} °C` }, (_err, data) => {
    console.log(data);
  });
};

tweetTemperature();
