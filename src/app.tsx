import { type FC } from 'react';

import { Link, Route, Router, Switch } from 'wouter';

import HomePage from '~/pages/home';
import AboutPage from './pages/about';
import ProductsPage from './pages/products';

export const App: FC = () => {
	return (
		<>
			<Router base='/dev/custom_stack'>
				<nav>
					<Link href='/'>Home</Link>
					{' · '}
					<Link href='/products'>Products Page</Link>
					{' · '}
					<Link href='/about'>About Page</Link>
				</nav>
				Switch below
				<Switch>
					<Route path='/' component={HomePage} />
					<Route path='/products' component={ProductsPage} />
					<Route path='/about' component={AboutPage} />
				</Switch>
			</Router>
		</>
	);
};
