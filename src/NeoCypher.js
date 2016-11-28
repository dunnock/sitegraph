// @flow

import React from 'react'
import { sigma } from 'sigma'
import 'sigma/build/plugins/sigma.parsers.json.require.js'
import 'sigma/build/plugins/sigma.neo4j.cypher.require.js'
import GraphItemsProducers from './SigmaGraphItemsProducers'
import { bindSigma } from './SigmaTools'

type State = {
    loaded: boolean
};
type Props = {
	url: string,
	user: string,
	password: string,
	query: string,
	producers: GraphItemsProducers,
    onGraphLoaded?: () => void,
    children?: mixed,
    sigma?: sigma
};
type DefaultProps = {
	producers: GraphItemsProducers
};


/**

NeoCypher component, interface for neo4j.cypher sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

Parameters:
 - @url       string    Neo4j instance REST API URL
 - @user      string    Neo4j instance REST API user
 - @password  string    Neo4j instance REST API password
 - @query     string    Neo4j cypher query
 - @producers GraphItemsProducers   Optional transformer for creating Sigma nodes and edges, 
                                    instance compatible with GraphItemsProducers
 - @onGraphLoaded  Function        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

**/


class NeoCypher extends React.PureComponent {
    state: State;
	props: Props;
	static defaultProps: DefaultProps = {
		producers: new GraphItemsProducers()
	};

    constructor(props: Props) {
        super(props)
        this.state = {loaded:false}
    }

	componentDidMount() {
		this._runQuery(this.props.query)
	}

	componentWillUpdate(props: Props) {
		// suppose url, user or password won't change for sigma instance, as well as sigma instance itself
		if(this.props.query !== props.query) {
            this.setState({loaded:false})
			this._runQuery(props.query)
        }
	}

	render() {
        if(!this.state.loaded)
            return null
        return <div>{bindSigma(this.props.children, this.props.sigma)}</div>
    }


    _runQuery(query: string) {
        sigma.neo4j.cypher(
                { url: this.props.url, user: this.props.user, password: this.props.password } ,
                query ,
                this.props.sigma ,
                this._onLoad.bind(this),
                this.props.producers
        )
    }

    _onLoad() {
        this.setState({loaded:true})
        if(this.props.sigma)
            this.props.sigma.refresh()
        if(this.props.onGraphLoaded)
            return this.props.onGraphLoaded()
    }

}

export default NeoCypher;

