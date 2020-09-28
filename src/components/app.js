import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import List from '../routes/list';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			<List path="/list" />
		</Router>
	</div>
)

export default App;
