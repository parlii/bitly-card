import { toPng, toSvg } from 'html-to-image';
import React, { useContext, useEffect, useState } from 'react';
import { ShareCardContext } from '../../context/ShareCardContext';

const CardTools: React.FC = () => {
  const { shareCard } = useContext(ShareCardContext);
  const [pngData, setPNGData] = useState<string>();
  const [svgData, setSVGData] = useState<string>();

  useEffect(() => {
    const loadCanvas = async () => {
      const element: HTMLElement = document.querySelector('.share-page__card');
      const pngDataUrl = await toPng(element);
      const svgDataUrl = await toSvg(element);
      setPNGData(pngDataUrl);
      setSVGData(svgDataUrl);
    };

    if (shareCard) {
      loadCanvas();
    }
  }, [shareCard]);

  return (
    <footer className="py-4">
      <div className="container">
        {pngData && svgData && (
          <div className="btn-group">
            <a
              className="btn btn-dark"
              download={`bitly-card-${shareCard?.backhalf}.png`}
              href={pngData}
            >
              Download PNG
            </a>
            <a
              className="btn btn-dark"
              download={`bitly-card-${shareCard?.backhalf}.png`}
              href={svgData}
            >
              Download SVG
            </a>
          </div>
        )}
      </div>
    </footer>
  );
};

export default CardTools;
