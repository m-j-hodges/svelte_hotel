import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bootstrap from 'bootstrap';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql'},)

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token')
  
  return {
    headers: {
      ...headers, auth: token ? `bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
