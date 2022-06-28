import GenerateLink from '../components/GenerateLink/GenerateLink';

const Page: React.FC = () => {
  return (
    <div className="generate-link-page d-flex w-100 align-items-center">
      <div className="col">
        <div className="container">
          {/* <h1 className="text-center mb-5">Bitly Card</h1> */}
          <GenerateLink />
        </div>
      </div>
    </div>
  );
};

export default Page;
