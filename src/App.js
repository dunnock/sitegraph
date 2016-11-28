// @flow

import React, { Component } from 'react';
import { Navbar, Jumbotron, DropdownButton, MenuItem, FormGroup } from 'react-bootstrap';
import Sigma from './Sigma';
import NeoCypher from './NeoCypher';
import NeoQueryInput from './NeoQueryInput'
import ForceAtlas2 from './ForceAtlas2'
import RelativeSize from './RelativeSize'
import LoadGEXF from './LoadGEXF'

type Props = {
  webgl: boolean,
  noRender: boolean
};
type DefaultProps = Props;
type State = {
  query: string,
  loader: string
};

class App extends Component {
  state: State;
  sigmaStyle: CSS;
  loaders: Array<mixed>;

  static defaultProps: DefaultProps = {
    webgl: false,
    noRender: false
  }

  constructor(props: Props) {
    super(props)
    this.state={
      query: "MATCH (n:Page)-[r1]->(m) RETURN * LIMIT 10000",
      loader: 0
    }
    this.sigmaStyle = { maxWidth:"inherit", height:"600px" }
    this.loaders = [
          <Sigma renderer={ this._renderer() } style={ this.sigmaStyle } >
            <NeoCypher url="http://localhost:7474" user="neo4j" password="admin"
                        query={ this.state.query }>
              <ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode/>
              <RelativeSize initialSize={8}/>
            </NeoCypher>
          </Sigma>
          ,
          <Sigma renderer="canvas" style={ this.sigmaStyle } settings={{drawEdges:false}} >
            <LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}>
              <ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.9} iterationsPerRender={10}
                          linLogMode timeout={6000} outboundAttractionDistribution/>
              <RelativeSize initialSize={10}/>
            </LoadGEXF>
          </Sigma>
    ]

  }

  _renderer() {
    return this.props.noRender ? null : this.props.webgl ? "webgl" : "canvas"
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">React App</a>
            </Navbar.Brand>
            <Navbar.Toggle  />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form>
              <DropdownButton title="Loader" id="loader"
                    onSelect={(loader) => this.setState({loader})}>
                  <MenuItem eventKey="0">Neo4j</MenuItem>
                  <MenuItem eventKey="1">GEXF</MenuItem>
              </DropdownButton>
              {' '}
              <NeoQueryInput
                    defaultQuery={ this.state.query }
                    onQueryChange={ q => this.setState({query:q}) } />
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron>
          {this.loaders[this.state.loader]}
        </Jumbotron>
      </div>
    );
  }
}


export default App;