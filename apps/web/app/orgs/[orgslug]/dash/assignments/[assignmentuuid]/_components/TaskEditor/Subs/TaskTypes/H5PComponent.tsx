import React, { useEffect, useRef } from 'react';

type H5PComponentProps = {
  iframeSrc: string;
};

const H5PComponent = ({ iframeSrc }: H5PComponentProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate that the message is from the correct origin
      if (event.origin !== new URL(iframeSrc).origin) return;

      // Handle the xAPI event from H5P
      if (event.data && event.data.type === 'xAPI') {
        const answer = event.data.data.result.response;
        console.log('User selected answer:', answer);
      }
    };

    // Add event listener to handle messages from the iframe
    window.addEventListener('message', handleMessage);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('message', handleMessage);
    };
  }, [iframeSrc]);

  return (
    <iframe
      ref={iframeRef}
      title="h5p-embed"
      src={iframeSrc}
      frameBorder="0"
      allowFullScreen
      width="100%"
      height="500px"
    />
  );
};

export default H5PComponent;
