/* eslint-disable @typescript-eslint/no-var-requires */
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import {IncomingMessage, ServerResponse} from 'http';
import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter, StaticRouterContext} from 'react-router';

import {App} from './app';

declare module 'fastify' {
  interface FastifyReply {
    view: (temlate: string, params?: Record<string, unknown>) => void;
  }
}

let assets: unknown;

const syncLoadAssets = () => {
  if (process.env.RAZZLE_ASSETS_MANIFEST) {
    assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
  }
};

syncLoadAssets();

const app = fastify();

app.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs'),
  },
});

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public', 'static'),
  prefix: '/static/',
});

app.get('/favicon.ico', (_, reply) => {
  reply.sendFile('favicon.ico', path.join(__dirname, 'public'));
});

app.get('/robots.txt', (_, reply) => {
  reply.sendFile('robots.txt', path.join(__dirname, 'public'));
});

app.get('/*', (request, reply) => {
  const context: StaticRouterContext = {};

  const markup = renderToString(
    <StaticRouter context={context} location={request.raw.url}>
      <App />
    </StaticRouter>,
  );

  if (context.url) {
    reply.redirect(context.url);
  } else {
    const template = path.join('public', 'views', 'index.ejs');
    reply.view(template, {markup, assets});
  }
});

export default async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  await app.ready();
  app.server.emit('request', req, res);
};
