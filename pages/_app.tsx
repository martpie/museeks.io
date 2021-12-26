import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window._Museeks = {

            checkDownloadsCount: function() {

              var oReq = new XMLHttpRequest();

              oReq.onload = function (e) {

                var releases = e.currentTarget.response;
                var count = 0;

                releases.forEach(function(elem) {
                  elem.assets.forEach(function(asset) {
                    count += asset['download_count'];
                  })
                });

                console.info('Downloads count: ' + count);
              };

              oReq.open('GET', 'https://api.github.com/repos/KeitIG/museeks/releases', true);
              oReq.responseType = 'json';
              oReq.send();
            }
          };`,
        }}
      />
    </>
  );
}

export default MyApp;
