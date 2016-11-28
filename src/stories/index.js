import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import Sigma from '../Sigma';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Sigma', module)
  .add('simple', () => (
  	<div id="container" style={{"max-width": "400px", "height": "400px", "margin:": "auto"}}>
    	<Sigma container="container"></Sigma>
    </div>
  ))