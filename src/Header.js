// @flow

import React from 'react';
import { Navbar, DropdownButton, MenuItem } from 'react-bootstrap';
import NeoQueryInput from './NeoQueryInput'


type Props = {
  onQueryChange: (q:string) => void,
  onLoaderSelect: (loader:string) => void,
  defaultQuery: string
};

function Header(props: Props) {
  return  <Navbar inverse fixedTop fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Sitegraph</a>
      </Navbar.Brand>
      <Navbar.Toggle  />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form>
        <DropdownButton title="Loader" id="loader"
              onSelect={ props.onLoaderSelect }>
            <MenuItem eventKey="0">Neo4j</MenuItem>
            <MenuItem eventKey="1">GEXF</MenuItem>
            <MenuItem eventKey="2">JSON</MenuItem>
            <MenuItem eventKey="3">JSON without coords</MenuItem>
        </DropdownButton>
        {' '}
        <NeoQueryInput
              defaultQuery={ props.defaultQuery }
              onQueryChange={ props.onQueryChange } />
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
}

export default Header;