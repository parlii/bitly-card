import { useContext } from 'react';
import CardTools from '../components/CardTools/CardTools';
import GenerateLink from '../components/GenerateLink/GenerateLink';
import Head from '../components/Head/Head';
import ShareCard from '../components/ShareCard/ShareCard';
import { ShareCardContext } from '../context/ShareCardContext';

const Page: React.FC = () => {
  const { shareCard } = useContext(ShareCardContext);

  return (
    <>
      <Head />

      <div className="grid-container">
        <div className="grid-generator">
          <GenerateLink />
        </div>
        <div className="grid-card">{shareCard && <ShareCard />}</div>
        <div className="grid-footer">
          <CardTools />
        </div>
      </div>
    </>
  );
};

export default Page;
