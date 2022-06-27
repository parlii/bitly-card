import { useContext } from 'react';
import GenerateLink from '../components/GenerateLink/GenerateLink';
import { FormContext } from '../context/formContext';

const Page: React.FC = () => {
  const { shortlink } = useContext(FormContext);

  return (
    <div>
      <GenerateLink />
      <p>
        <strong>Shortlink:</strong> {shortlink}
      </p>
    </div>
  );
};

export default Page;
