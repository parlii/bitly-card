import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Image from 'next/image';

import qr from '../../../../public/img/qr.png';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const {
    params: { domain, backhalf },
  } = ctx;

  return { props: { domain, backhalf } };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<Props> = ({ domain, backhalf }) => {
  return (
    <div className="share-card-page share-card-page--style-6 d-flex align-items-center">
      <div className="share-card-page__card d-flex align-items-center justify-content-center">
        {/* <div className="logo"></div> */}
        {/* <Image className="logo" src={logo} height="30px" width="30px" /> */}
        <div className="share-card-page__qr-code">
          <Image alt={`QR code that leads to ${domain}/${backhalf}`} src={qr} />
        </div>
      </div>
      <div className="share-card-page share-card-page__link-info px-4 py-2">
        <div className="share-card-page__link-info__domain">{domain}</div>
        <div className="share-card-page__link-info__backhalf">{backhalf}</div>
        <div className="share-card-page__link-info__forwards-to">
          Forwards to domain.com/
        </div>
      </div>
    </div>
  );
};

export default Page;
