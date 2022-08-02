import { FC } from "react";
import './PageLoader.css';

interface Props {
  bgColor?: string;
}

const PageLoader: FC<Props> = ({ bgColor }) => {

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: `${bgColor || 'transparent'}`,
    }}>
      <span className='loader'></span>
    </div>
  );
}

export default PageLoader;
