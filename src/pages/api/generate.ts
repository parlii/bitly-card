import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  const body = JSON.parse(req.body);
  console.log(body);

  const testResponse = {
    destinationUrl: body.destinationUrl,
    shortlink: 'bit.ly/abc123',
  };

  res.status(200).json(testResponse);
};

export default handler;
