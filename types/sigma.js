
// EXPORTS

export type Sigma$Settings = Sigma$Settings$Renderer & Sigma$Settings$Graph 
				& Sigma$Settings$Renderer$HoverNode & Sigma$Settings$Renderer$HoverEdge
				& Sigma$Settings$Renderer$Switches & Sigma$Settings$Renderer$Performance
				& Sigma$Settings$Rescale & Sigma$Settings$Captors
				& Sigma$Settings$Global & Sigma$Settings$Camera
				& Sigma$Settings$Animation;

export type Sigma$Graph$Data = {
	nodes: [Sigma$Node],
	edges: [Sigma$Edge]
};

export type Sigma$Node = {
	id: string,
	label?: string,
	x?: number,
	y?: number,
	size?: number,
	color?: color
};

export type Sigma$Edge = {
	id: string,
	source: string,
	target: string,
	label?: string,
	color?: color
};

export type Sigma$Neo4jCypher$Producers = {
	node: (Neo4j$Node) => Sigma$Node,
	edge: (Neo4j$Edge) => Sigma$Edge
};

export type Neo4j$Node = {
	id: string,
	labels: Array<string>,
	properties: KeyValueObject
};

export type Neo4j$Edge = {
	id: string,
	type: string,
	startNode: string,
	endNode: string,
	properties: KeyValueObject
};	

export type Sigma$Renderer = "webgl" | "canvas";

export type KeyValueObject = {[string]: string};

export type Sigma$Event = {
	data: {
		node?: Neo4j$Node,
		edge?: Neo4j$Edge,
		captor: {
			clientX: number,
			clientY: number
		}
	}
};

// Following type requires EdgeShapes component
export type Sigma$Edge$Shapes = "def" | "line" | "arrow" | "curved" | "dashed" | "dotted" | "parallel" | "tapered";

// Following type requires NodeShapes component
export type Sigma$Node$Shapes = "def" | "pacman" | "star" | "equilateral" | "cross" | "diamond" | "circle" | "square";

// Following type used in Filter component
export type Nodes$Filter = (node: Sigma$Node) => boolean;


// TYPES DECOMPOSITION

type Sigma$Settings$Graph = {
	clone?: boolean,
	immutable?: boolean,
	verbose?: boolean
};

type Sigma$Settings$Renderer = {
	defaultNodeType?: string,
	defaultEdgeType?: string,
	defaultLabelColor?: color,
	defaultEdgeColor?: color,
	defaultNodeColor?: color,
	defaultLabelSize?: number,
	edgeColor?: "source" | "target" | "default",
	minArrowSize?: number,
	font?: string,
	fontStyle?: string,
	labelColor?: Sigma$DefaultNodeOption,
	labelSize?: "fixed" | "proportional",
	labelSizeRatio?: number,
	labelThreshold?: number,
	webglOversamplingRatio?: number
};

type Sigma$Settings$Renderer$HoverNode = {
	borderSize?: number,
	defaultNodeBorderColor?: color,
	hoverFont?: string,
	hoverFontStyle?: string,
	labelHoverShadow?: Sigma$DefaultNodeOption,
	labelHoverShadowColor?: color,
	nodeHoverColor?: Sigma$DefaultNodeOption,
	defaultNodeHoverColor?: color,
	labelHoverBGColor?: Sigma$DefaultNodeOption,
	defaultHoverLabelBGColor?: color,
	labelHoverColor?: Sigma$DefaultNodeOption,
	defaultLabelHoverColor?: color,
	singleHover?: boolean
};

type Sigma$Settings$Renderer$HoverEdge = {
	edgeHoverColor?: color,
	defaultEdgeHoverColor?: Sigma$DefaultEdgeOption,
	edgeHoverSizeRatio?: number,
	edgeHoverExtremities?: boolean
};

type Sigma$Settings$Renderer$Switches = {
	drawLabels?: boolean,
	drawEdgeLabels?: boolean,
	drawEdges?: boolean,
	drawNodes?: boolean
};

type Sigma$Settings$Renderer$Performance = {
	batchEdgesDrawing?: boolean,
	canvasEdgesBatchSize?: number,
	webglEdgesBatchSize?: number,
	hideEdgesOnMove?: boolean
};

type Sigma$Settings$Rescale = {
	scalingMode?: "inside" | "outside",
	sideMargin?: number,
	minEdgeSize?: number,
	maxEdgeSize?: number,
	minNodeSize?: number,
	maxNodeSize?: number
};

type Sigma$Settings$Captors = {
	touchEnabled?: boolean,
	mouseEnabled?: boolean,
	mouseWheelEnabled?: boolean,
	doubleClickEnabled?: boolean,
	eventsEnabled?: boolean,
	zoomingRatio?: number,
	doubleClickZoomingRatio?: number,
	zoomMin?: number,
	zoomMax?: number,
	mouseZoomDuration?: number,
	doubleClickZoomDuration?: number,
	mouseInertiaDuration?: number,
	mouseInertiaRatio?: number,
	touchInertiaDuration?: number,
	touchInertiaRatio?: number,
	doubleClickTimeout?: number,
	doubleTapTimeout?: number,
	dragTimeout?: number
};

type Sigma$Settings$Global = {
	autoResize?: boolean,
	autoRescale?: boolean,
	enableCamera?: boolean,
	enableHovering?: boolean,
	enableEdgeHovering?: boolean,
	edgeHoverPrecision?: number,
	rescaleIgnoreSize?: boolean,
	skipErrors?: boolean
};

type Sigma$Settings$Camera = {
	nodesPowRatio?: number,
	edgesPowRatio?: number
};

type Sigma$Settings$Animation = {
	animationsTime?: number
};

type Sigma$DefaultNodeOption = "default" | "node";

type Sigma$DefaultEdgeOption = "default" | "node";

type color = string;
