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

const GenerateQR = async (
  shortLinkDomain: string,
  shortLinkBackhalf: string,
) => {
  var config = {
    method: 'GET',
    url: `https://api-ssl.bitly.com/v4/bitlinks/${shortLinkDomain}/${shortLinkBackhalf}/qr?image_format=svg&color=001345`,
    headers: {
      Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
    },
  };

  const response = await axios(config);

  return await response;
};

const handler: NextApiHandler = async (req, res) => {
  const body = JSON.parse(req.body);

  const shortenLinkResponse = await ShortenUrl(body.destinationUrl);
  const shortLinkDomain = shortenLinkResponse.data.id.split('/')[0];
  const shortLinkBackhalf = shortenLinkResponse.data.id.split('/')[1];

  const getQRResponse = await GenerateQR(shortLinkDomain, shortLinkBackhalf);
  const qr = getQRResponse.data.qr_code;

  const destinationDomain = body.destinationUrl.split('://')[1].split('/')[0];

  const response = {
    domain: shortLinkDomain,
    backhalf: shortLinkBackhalf,
    destinationDomain: destinationDomain,
    qr: qr,
  };

  res.status(200).json(response);
};

export default handler;
