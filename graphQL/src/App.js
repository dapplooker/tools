import './App.css';
import Home from './component/home';
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import Graph from './component/graphs';
import {Route, BrowserRouter} from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

function App() {

  const [subgraphEndpoint, setGraphEndpoint] = useState('https://api.thegraph.com/subgraphs/name/livepeer/livepeer');

  const setSubgraphEndpoint = (uri) => {
    setGraphEndpoint(uri);
  }
  const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:subgraphEndpoint
  });

  return (
    <ApolloProvider className="App" client={client}>
      <BrowserRouter>
      <Route path="/"  exact component ={Home}></Route>
      <Route
            exact
            path="/:graph/:subgraph"
            render={(props) => (
              <Graph
                {...props}
                setSubgraph={setSubgraphEndpoint}
              ></Graph>
            )}
          ></Route>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
