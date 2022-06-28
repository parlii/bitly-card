import { NextApiHandler } from 'next';
import { Url } from 'url';

var axios = require('axios');

const ShortenUrl = async (destinationUrl: Url) => {
  var payload = {
    group_guid: `${process.env.DEFAULT_GROUP_GUID}`,
    long_url: destinationUrl,
    domain: 'bit.ly',
  };

  var config = {
    method: 'POST',
    url: 'https://api-ssl.bitly.com/v4/shorten',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
    },
    data: JSON.stringify(payload),
  };

  const response = await axios(config);

  return await response;
};

// const GenerateQR = (url: Url) => {
//   var payload = {
//     group_guid: 'BlcemOt3jWM',
//     long_url: destinationUrl,
//     domain: 'bit.ly',
//   };

//   var config = {
//     method: 'POST',
//     url: 'https://api-ssl.bitly.com/v4/shorten',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer 891fde1d4190877eab0b1f1e12673cdbbe169d44',
//     },
//     data: JSON.stringify(payload),
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

const handler: NextApiHandler = async (req, res) => {
  const body = JSON.parse(req.body);

  const shortenedUrl = await ShortenUrl(body.destinationUrl);

  console.log(shortenedUrl);

  // const qrCode = GenerateQR(`http://bit.ly/parli`);

  const testResponse = {
    backhalf: 'abc123',
    destination: body.destinationUrl,
    domain: 'bit.ly',
  };

  res.status(200).json(testResponse);
};

export default handler;
