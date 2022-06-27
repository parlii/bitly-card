import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  const { body } = req;
  console.log(body);
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
