import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import Image from 'next/image';

import qr from '../../../../public/qr.png';
import logo from '../../../../public/logo.png';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const {
    params: { domain, backhalf },
  } = ctx;

  console.log(ctx);
  console.log(domain, backhalf);

  return { props: { domain, backhalf } };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<Props> = ({ domain, backhalf }) => {
  return (
    <div className="body">
      <div className="card">
        {/* <div className="logo"></div> */}
        <Image className="logo" src={logo} height="30px" width="30px" />
        <div className="qr">
          <Image src={qr} height="150px" width="150px" />
        </div>
        <div className="shortLinkInfo">
          <div className="domain">{domain}</div>
          <div className="backhalf">{backhalf}</div>
          <div className="forwardsTo">Forwards to domain.com/</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
