import * as React from 'react';

type BackgroundImageProps = {
  imageUrl: string;
  children: React.ReactNode;
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  children,
}) => {
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'auto',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className='h-full w-full relative' style={divStyle}>
      {children}
    </div>
  );
};

export default BackgroundImage;
