import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import theme from './theme';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from './context/Context';

import Provider from './context/Provider';

import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Notification from './components/Notification';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import DataPoints from './pages/DataPoints';

library.add(fas);

const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0px;
        padding: 0px;
		max-width: 100%;
		min-height: 100vh;
		font-family: 'Rubik', sans-serif;
		font-weight: ${props => props.theme.fontWeight.regular};
		font-display: swap;
		color: ${props => props.theme.colors.black};
		hyphens: manual;
		text-rendering: optimizeLegibility;
		background-color: ${props => props.theme.colors.gray_20};
		
	}

    
    h1 {
		font-weight: ${props => props.theme.fontWeight.regular};
		font-size: 90.44px;
		line-height: 112px;
		margin: 0px;
    }
    h2 {
		font-weight: ${props => props.theme.fontWeight.regular};
		font-size: 63.96px;
		line-height: 80px;
		margin: 0px;
    }
    h3 {
		font-weight: ${props => props.theme.fontWeight.regular};
		font-size: 45.23px;
		line-height: 48px;
		margin: 0px;
    }
    h4 {
		font-weight: ${props => props.theme.fontWeight.regular};
		font-size: 31.99px;
		line-height: 40px;
		margin: 0px;
    }
    h5 {
		font-weight: ${props => props.theme.fontWeight.regular};
		font-size: 22.62px;
		line-height: 32px;
		margin: 0px;
    }
    h6 {
		font-weight: ${props => props.theme.fontWeight.regular};
		font-size: 18px;
		line-height: 24px;
		margin: 0px;
	}
	p {
		font-weight: ${props => props.theme.fontWeight.regular};
		font-size: 16px;
		line-height: 24px;
		margin: 0px;

	}
    img {
        max-width: 100%;
	}
	a, a:link, a:visited, a:focus, a:hover, a:active{
		color: inherit;
		text-decoration:none; 
		cursor: pointer;
	  }
  
    button {
		all: unset;
		font-family: 'Open Sans', sans-serif;
		

	}
	button:hover {
		cursor: pointer !important;
	}





    input {
		all: unset;
		font-family: 'Open Sans', sans-serif;

        ::-webkit-input-placeholder {
	}
	input, select {
		-webkit-box-sizing: border-box;
		   -moz-box-sizing: border-box;
				box-sizing: border-box;
	}
    :-moz-placeholder {
        /* FF 4-18 */
        opacity: 1;
    }
    ::-moz-placeholder {
        /* FF 19+ */
        opacity: 1;
    }
    :-ms-input-placeholder {
        /* IE 10+ */
    }
    ::-ms-input-placeholder {
        /* Microsoft Edge */
    }
    ::placeholder {
        /* modern browser */
    }
    
    
`;

const App = () => {
	const PrivateRoute = ({ component: Component, ...rest }) => {
		const { user } = useContext(AppContext);

		return (
			<Route
				{...rest}
				render={props =>
					user.email ? (
						<Component {...props} />
					) : (
							<Redirect
								to={{
									pathname: '/loginpage',
								}}
							/>
						)
				}
			/>
		);
	};
	return (
		<ThemeProvider theme={theme}>
			<Provider>
				<Router>
					<SideBar />
					<TopBar title="Hyperfigures" />
					<Notification />
					<Switch>
						<Route exact path="/" component={() => <Home />} />
						<PrivateRoute exact path="/profilepage" component={Profile} />
						<PrivateRoute exact path="/dashboardpage" component={Dashboard} />
						<PrivateRoute exact path="/error" component={ErrorPage} />
						<PrivateRoute exact path="/datapoints" component={DataPoints} />

						<Route exact path="/loginpage" component={Login} />
					</Switch>
				</Router>
				<GlobalStyle />
			</Provider>
		</ThemeProvider>
	);
};

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(<App />, document.getElementById('app'));
}
