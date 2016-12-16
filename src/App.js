// @flow

import React from 'react';
import Header from './Header'
import SigmaUI from './SigmaUI'

type State = {
  query: string,
  loader: string
};

class App extends React.Component {
  state: State;
  loaders: Array<mixed>;

  constructor(props: mixed) {
    super(props)
    this.state={
      query: process.env.REACT_APP_DEFAULT_QUERY || "",
      loader: "1"
    }
  }

  render() {
    return (
      <div>
        <Header defaultQuery={ this.state.query }
                onQueryChange={ query => { console.log(query); this.setState({query}) } }
                onLoaderSelect={ loader => this.setState({loader}) } />
        <SigmaUI {...this.state}/>
      </div>
    );
  } 
}


export default App;