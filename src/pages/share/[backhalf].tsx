import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    params: { backhalf },
  } = ctx;

  return { props: { backhalf } };
};

const Page: React.FC = ({ backhalf }) => {
  return (
    <div>
      <h1>{backhalf}</h1>
    </div>
  );
};

export default Page;
