// @flow

import React from 'react'
import { sigma } from 'sigma'
import { bindSigma } from './SigmaTools'


type Props = {
  style: CSS,
  settings: Sigma$Settings,
  renderer: "webgl" | "canvas" | null,
  children?: mixed,
  graph?: Sigma$Graph$Data
};
type DefaultProps = {
  settings: Sigma$Settings
};


/**

Sigma - React.JS interface for Sigma js library - fastest opensource rendering engine for linked graphs.
Its fast because implements optimized graph traversing under the hood and WebGL rendering, its extensible thanks
to its object and plugins model.

Can be composed with plugins natively using JSX syntax, e.g.:

''''
    <Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}} >
      <LoadJSON url="geolocalized.json">
        <RelativeSize initialSize={8}/>
      </LoadJSON>
    </Sigma>
''''

Parameters:
 - @style  CSS   CSS style description for main div holding graph, should be specified in React format
 - @settings  Sigma$Settings     js object with sigma initialization options
                as described on [sigma settings page](https://github.com/jacomyal/sigma.js/wiki/Settings)
 - @renderer   string     can be "webgl" or "canvas"
 - @graph     Sigma$Graph$Data   js object with array of nodes and edges used to initialize sigma

**/


class Sigma extends React.Component {
  props: Props;
  sigma: sigma;
  plugins: mixed;
  sigmaRenderer: mixed;

  static defaultProps: DefaultProps = {
    settings: {
      defaultNodeColor: "#3388AA",
      defaultLabelSize: 6,
      defaultLabelColor: "#777",
      labelThreshold: 12,
      hoverFontStyle: "text-size: 11",
      batchEdgesDrawing: true,
      drawEdges: true,
      drawEdgeLabels: false
    }     
  }

  constructor(props: Props) {
    super(props);
    let settings = this.props.settings ? this.props.settings : {}
    this.sigma = new sigma({settings})
  }

  initRenderer(container: HTMLElement) {
    if(container && this.props.renderer) {
      // TODO: make it identify default renderer (e.g. webgl when available)
      this.sigmaRenderer = this.sigma.addRenderer({
        type: this.props.renderer,
        container
      })
      this.sigma.refresh()
    } else if(this.sigmaRenderer) {
      this.sigma.killRenderer(this.sigmaRenderer)
      this.sigmaRenderer = null
    }
  }

  componentWillUnmount() {
    this.sigma.kill()
  }

  render() {
    return <div ref={this.initRenderer.bind(this)} style={this.props.style}>
          {bindSigma(this.props.children, this.sigma)}
        </div>;
  }
}

export default Sigma;

