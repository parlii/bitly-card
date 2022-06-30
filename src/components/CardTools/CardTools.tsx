import { toPng, toSvg } from 'html-to-image';
import React, { useContext, useEffect, useState } from 'react';
import { ShareCardContext, Themes } from '../../context/ShareCardContext';

const CardTools: React.FC = () => {
  const { shareCard, setTheme, theme } = useContext(ShareCardContext);
  const [pngData, setPNGData] = useState<string>();
  const [svgData, setSVGData] = useState<string>();

  const loadCanvas = async () => {
    const element: HTMLElement = document.querySelector('.share-page__card');
    const pngDataUrl = await toPng(element);
    const svgDataUrl = await toSvg(element);
    setPNGData(pngDataUrl);
    setSVGData(svgDataUrl);
  };

  useEffect(() => {
    // reload images if theme changes or shareCard loads
    if (shareCard) {
      loadCanvas();
    }
  }, [shareCard, theme]);

  return (
    <div className="grid-tools">
      <footer className="py-4">
        <div className="container">
          <div className="row align-items-end justify-content-center">
            {shareCard && (
              <div className="col-md-auto">
                <label htmlFor="select-theme">Select Theme</label>
                <select
                  aria-label="Set the card theme"
                  className="form-select"
                  id="select-theme"
                  onChange={(e) => {
                    setTheme(e.target.value as Themes);
                  }}
                >
                  {Object.entries(Themes).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {pngData && svgData && (
              <div className="col-md-auto mt-2 mt-md-0">
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
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CardTools;
