"use client"

import React, { useEffect, useState } from 'react';
import { Copy, CopyCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface DownloadLinkCellProps {
  uploadSuccess: boolean;
  renderValue: () => any; 
}

const DownloadLinkCell: React.FC<DownloadLinkCellProps> = ({ renderValue }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const downloadURL = renderValue() as string;

    const handleCopy = () => {
    navigator.clipboard
      .writeText(downloadURL)
      .then(() => {
        setCopySuccess(true);
        toast.success('Link copied!');
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); 
      })
      .catch((error) => {
        console.error('Copy failed:', error);
        toast.error('Copy failed! Please try again.');
      });
  };

  return (
    <div>
      <Button
        variant='link'
        className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
        onClick={handleCopy}
      >
        {copySuccess ? <CopyCheck size={20} color="green" /> : <Copy size={20} />}
      </Button>
    </div>
  );
};

export default DownloadLinkCell;
