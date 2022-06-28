import { NextApiHandler } from 'next';
import { ShareCard } from '../../context/ShareCardContext';

const handler: NextApiHandler<ShareCard> = (req, res) => {
  const body = JSON.parse(req.body);

  const testResponse = {
    backhalf: 'abc123',
    destination: body.destinationUrl,
    domain: 'bit.ly',
  };

  res.status(200).json(testResponse);
};

export default handler;
