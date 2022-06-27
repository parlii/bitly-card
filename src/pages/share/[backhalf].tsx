import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const {
    params: { backhalf },
  } = ctx;

  return { props: { backhalf } };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page: NextPage<Props> = ({ backhalf }) => {
  return (
    <div>
      <h1>{backhalf}</h1>
    </div>
  );
};

export default Page;
