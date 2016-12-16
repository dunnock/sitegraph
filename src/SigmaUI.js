
import React from 'react';
import { Jumbotron, Popover } from 'react-bootstrap';
import { Sigma, LoadJSON, SigmaEnableWebGL, EdgeShapes, NodeShapes, NeoCypher, LoadGEXF, Filter, ForceAtlas2, RelativeSize, RandomizeNodePositions, NOverlap } from 'react-sigma'


type Props = {
	query: string,
	loader: string
};
type State = {
	showDetails: mixed
};

class SigmaUI extends React.Component {
	props: Props;
	state: State;

	constructor(props: Props) {
		super(props)
		this.state = {
			showDetails: null
		}
	}

	render() {
		console.log("SigmaUI render")
		let popover = this.state.showDetails && 
			<Popover
	      id="popover-basic"
	      placement="bottom"
	      positionLeft={this.state.showDetails.captor.clientX - 140}
	      positionTop={this.state.showDetails.captor.clientY}
	      title={this.state.showDetails.node.label}>
    			{this.state.showDetails.node.neo4j_data.outer_html}
	    </Popover>
		return  <Jumbotron id="jumbotron">
		            { this._sigmaComponent() }
		            { popover }
	        </Jumbotron>
	}

	_sigmaComponent() {
		console.log("Rendering sigma component " + this.props.loader)

	  if(this.props.loader === "0" )
	    return <Sigma key="0" renderer="webgl" settings={{drawEdges:false}}
	  								onClickNode={ e => this.setState({filterNeighbours: e.data.node.id}) }
	  								onClickStage={ e => this.setState({filterNeighbours: null}) } >
		            <NeoCypher url="http://localhost:7474" user="neo4j" password="admin"
		                        query={ this.props.query }>
		              <Filter neighborsOf={ this.state.filterNeighbours } />
		              <ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode/>
		              <RelativeSize initialSize={8}/>
		            </NeoCypher>
		          </Sigma>
	  else if (this.props.loader === "1" )
	    return  <Sigma renderer="canvas" key="1"
	  								onClickNode={ e => this.setState({filterNeighbours: e.data.node.id}) }
	  								onClickStage={ e => this.setState({filterNeighbours: null}) } >
	  						<EdgeShapes default="tapered"/>
	  						<NodeShapes default="star"/>
		            <LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}>
		              <Filter neighborsOf={ this.state.filterNeighbours } />
	              	<ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode timeout={3000}/>
		              <RelativeSize initialSize={15}/>
		            </LoadGEXF>
	          	</Sigma>
	  else if (this.props.loader === "2" )
	    return  <Sigma renderer="canvas" key="2"
	  							onClickNode={ e => this.setState({showDetails: e.data}) }
	                onClickStage={ e => this.setState({showDetails: null}) } >
	  						<EdgeShapes default="curvedArrow"/>
	  						<NodeShapes default="diamond"/>
		            <LoadJSON path={String(process.env.PUBLIC_URL) + "/upwork.json"}>
	            		<NOverlap nodeMargin={10} scaleNodes={4} duration={3000} speed={10} maxIterations={100} gridSize={20} easing="quadraticInOut" />
		              <RelativeSize initialSize={15}/>
		            </LoadJSON>
	          	</Sigma>
	  else if (this.props.loader === "3" ) // TODO
	    return  <Sigma renderer="canvas" key="3">
	  						<EdgeShapes default="dashed"/>
	  						<NodeShapes default="star"/>
		            <LoadJSON path={String(process.env.PUBLIC_URL) + "/geolocalized.json"}>
		            	<RandomizeNodePositions />
	              	<ForceAtlas2 worker slowDown={10} iterationsPerRender={1} timeout={3000} />
		              <RelativeSize initialSize={15}/>
		            </LoadJSON>
	          	</Sigma>
	}
}

export default SigmaUI;
