import { NextApiHandler } from 'next';
import { Url } from 'url';
import { ShareCard } from '../../context/ShareCardContext';

const accessToken = process.env.BITLY_ACCESS_TOKEN;
const groupId = process.env.BITLY_DEFAULT_GROUP_GUID;

const shortenUrl = async (destinationUrl: Url) => {
  const payload = {
    group_guid: groupId,
    long_url: destinationUrl,
    domain: 'bit.ly',
  };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch('https://api-ssl.bitly.com/v4/shorten', config);

  return response;
};

const generateQR = async (
  shortLinkDomain: string,
  shortLinkBackhalf: string,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await fetch(
    `https://api-ssl.bitly.com/v4/bitlinks/${shortLinkDomain}/${shortLinkBackhalf}/qr?image_format=svg&color=001345`,
    config,
  );

  return response;
};

const handler: NextApiHandler<ShareCard> = async (req, res) => {
  const body = JSON.parse(req.body);

  const shortenLinkResponse = await shortenUrl(body.destinationUrl);

  if (shortenLinkResponse.status != 200 && shortenLinkResponse.status != 201) {
    res.status(500).json(null);
    return;
  }

  const shortenLinkResponseBody = await shortenLinkResponse.json();

  const shortLinkDomain = shortenLinkResponseBody.id.split('/')[0];
  const shortLinkBackhalf = shortenLinkResponseBody.id.split('/')[1];

  const getQRResponse = await generateQR(shortLinkDomain, shortLinkBackhalf);

  if (getQRResponse.status != 200 && getQRResponse.status != 201) {
    res.status(500).json(null);
    return;
  }

  const qrResponseBody = await getQRResponse.json();
  const qr = qrResponseBody.qr_code;
  const destinationDomain = body.destinationUrl.split('://')[1].split('/')[0];

  const response = {
    domain: shortLinkDomain,
    backhalf: shortLinkBackhalf,
    destinationDomain,
    qr,
  };

  res.status(200).json(response);
};

export default handler;
