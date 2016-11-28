// @flow

import React from 'react';
import { Button, FormGroup, FormControl, InputGroup, HelpBlock, Well, Collapse } from 'react-bootstrap';


type Props = {
  onQueryChange: (q:string) => void,
  defaultQuery: string
};
type State = {
  showHelp: boolean,
  query: string
};

class NeoQueryInput extends React.Component {
  state: State;
  input: HTMLInputElement;
  constructor(props: Props) {
    super(props)
    this.state = {
      showHelp: false,
      query: this.props.defaultQuery || "MATCH (n) RETURN n LIMIT 100"
    }
    this.help = <Popover id="help" title="Type in neo4j cypher query">
                  <HelpBlock>For example <code>MATCH (n)-[r1]-(m) RETURN * LIMIT 100</code></HelpBlock>
                </Popover>
  }
  render() {
    return <FormGroup controlId="search">
      <InputGroup>
        <InputGroup.Button>
          <OverlayTrigger trigger="focus" placement="bottom" overlay={this.help}>
            <Button>?</Button>
          </OverlayTrigger>
        </InputGroup.Button>
        <FormControl style={{width:"20em"}} inputRef={ ref => this.input=ref } placeholder={this.state.query} />
        <InputGroup.Button>
          <Button onClick={ () => this.props.onQueryChange(this.input.value) }>Search</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup> 
  }
}

export default NeoQueryInput