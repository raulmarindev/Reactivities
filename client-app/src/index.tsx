import App from 'app/layout/App';
import 'app/layout/styles.css';
import { appTheme } from 'app/themes';
import { MuiThemeProvider } from 'material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from 'serviceWorker';
import { store } from 'store';

ReactDOM.render(
    <MuiThemeProvider theme={appTheme}>
        <Provider store={store} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
