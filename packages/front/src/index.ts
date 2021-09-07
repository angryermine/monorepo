/* eslint-disable @typescript-eslint/no-var-requires */
import http from 'http';

const PORT = process.env.PORT || 3000;

let app: http.RequestListener = require('./server').default;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`> Server Started on port ${PORT}`);
});

if (module.hot) {
  module.hot.accept('./server', function () {
    console.log('🔁 HMR Reloading `./server`...');

    try {
      const next: http.RequestListener = require('./server').default;
      server.removeListener('request', app);
      server.on('request', next);
      app = next;
    } catch (error) {
      console.error(error);
    }

    console.log('🚀 Server-side HMR Complete');
  });

  console.info('✅ Server-side HMR Enabled!');
}
