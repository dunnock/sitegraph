// @flow

import React from 'react'
import { sigma } from 'sigma'
import 'sigma/build/plugins/sigma.parsers.gexf.require.js'
import { bindSigma } from './SigmaTools'

type State = {
    loaded: boolean
};
type Props = {
	path: string,
    onGraphLoaded?: () => void,
    children?: mixed,
    sigma?: sigma
};


/**

LoadGEXF component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

Parameters:
 - @path       string   path to the JSON file
 - @onGraphLoaded  Function        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

**/


class LoadGEXF extends React.PureComponent {
    state: State;
	props: Props;

    constructor(props: Props) {
        super(props)
        this.state = {loaded:false}
    }

	componentDidMount() {
		this._load(this.props.path)
	}

	componentWillUpdate(props: Props) {
		// reload only if path changes
		if(this.props.path !== props.path) {
            this.setState({loaded:false})
			this._load(props.path)
        }
	}

	render() {
        if(!this.state.loaded)
            return null
        return <div>{bindSigma(this.props.children, this.props.sigma)}</div>
    }


    _load(url: string) {
        sigma.parsers.gexf(
                this.props.path ,
                this.props.sigma ,
                this._onLoad.bind(this)
        )
    }

    _onLoad() {
        this.setState({loaded:true})
        if(this.props.onGraphLoaded)
            return this.props.onGraphLoaded()
    }

}

export default LoadGEXF;

