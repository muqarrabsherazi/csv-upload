import React from 'react';

type Props = {
  message: string;
  visible: boolean;
};

const SuccessDialog: React.FC<Props> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-green-500 text-white px-6 py-4 rounded shadow-lg z-50 text-center">
      {message}
    </div>
  );
};

export default SuccessDialog;