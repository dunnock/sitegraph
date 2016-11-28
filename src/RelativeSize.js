// @flow

import React from 'react'
import { sigma } from 'sigma'
import 'sigma/build/plugins/sigma.plugins.relativeSize.require.js'

type Props = {
	initialSize: number,
	sigma?: sigma
};

/**

RelativeSize component, interface for RelativeSize sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Parameters:
 - @initialSize  number  start size for every node, will be multiplied by Math.sqrt(node.degree)

**/

class RelativeSize extends React.Component {
	props: Props;

	componentWillMount() {
		console.log("RelativeSize.componentWillMount")
		sigma.plugins.relativeSize(this.props.sigma, this.props.initialSize)
	}

	render = () => null
}

export default RelativeSize;

