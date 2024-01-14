import { resolve } from 'node:path';

import webpack from 'webpack';
import 'webpack-dev-server';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { convert } from 'tsconfig-to-swcconfig';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default function config(_: any, { mode }): webpack.Configuration {
	return {
		mode,

		resolve: {
			extensions: ['.tsx', '.js'],
			plugins: [new TsconfigPathsPlugin()],
		},

		module: {
			rules: [
				{
					test: /.[jt]sx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'swc-loader',
						options: convert(undefined, process.cwd(), {
							jsc: { baseUrl: process.cwd() },
						}),
					},
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},

		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			new HtmlWebpackPlugin({
				title: 'Custom Stack',
				filename: 'index.html',
				template: 'index-template.html',
				favicon: 'public/favicon.ico',
			}),
		],

		entry: {
			client: 'src/entry.tsx',
		},

		output: {
			path: resolve('dist/client'),
			filename: '[name].js',
		},

		devtool: 'inline-source-map',

		devServer: {
			historyApiFallback: true,
			hot: true,
		},
	};
}
