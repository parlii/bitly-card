import { useContext } from 'react';
import GenerateLink from '../components/GenerateLink/GenerateLink';
import Head from '../components/Head/Head';
import ShareCard from '../components/ShareCard/ShareCard';
import { ShareCardContext } from '../context/ShareCardContext';

const Page: React.FC = () => {
  const { shareCard } = useContext(ShareCardContext);

  return (
    <>
      <Head />

      <div className="generate-link-page d-flex w-100 align-items-center">
        <div className="col">
          <div className="container">
            {!shareCard && <GenerateLink />}
            {shareCard && <ShareCard />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
