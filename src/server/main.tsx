import express from 'express';
import path from 'path';
import fs from 'fs';

import ReactDOMServer from 'react-dom/server';

import { App } from '../app';

const server = express();

const port = 3000;

server.use('^/$', (req, res, next) => {
	fs.readFile(
		path.resolve('./dist/client/index.html'),
		'utf-8',
		(err, data) => {
			if (err) {
				console.log(err);
				return res.status(500).send('There was an error');
			}
			return res.send(
				data.replace(
					'<div id="root"></div>',
					`<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`,
				),
			);
		},
	);
});

const __dirname = path.resolve();
server.use(express.static(path.join(__dirname, '../../dist/client')));

server.listen(port, () => {
	console.log('Listening on port 3000');
});
