import { TailSpin as TailSpinner } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styled from 'styled-components';

const TailSpin = () => {
  return (
    <SLoading>
      <TailSpinner
        color="#00BFFF"
        height={80}
        width={80}
        ariaLabel="loading"
      ></TailSpinner>
    </SLoading>
  );
};

const SLoading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export { TailSpin };
