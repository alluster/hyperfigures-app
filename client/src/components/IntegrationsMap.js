import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import CytoscapeComponent from 'react-cytoscapejs';
import edgehandles from 'cytoscape-edgehandles';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AppContext } from '../context/Context';
import cytoscape from 'cytoscape';

cytoscape.use(edgehandles);

const Wrapper = styled.div`
	@media ${device.laptop} {
	}
`;

const IntegrationsMap = () => {
	const context = useContext(AppContext);
	const [elements, setElements] = useState([]);
	const [connections, setConnections] = useState([]);
	const [loading, setLoading] = useState(false);

	const layout = {
		name: 'circle',
		fit: true, // whether to fit the viewport to the graph
		padding: 30, // the padding on fit
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
		nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
		spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
		radius: undefined, // the radius of the circle
		startAngle: 3 / 2 * Math.PI, // where nodes start in radians
		sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
		clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
		sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
		animate: false, // whether to transition the node positions
		animationDuration: 500, // duration of animation in ms if enabled
		animationEasing: undefined, // easing of animation if enabled
		animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
		ready: undefined, // callback on layoutready
		stop: undefined, // callback on layoutstop
		transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
	  
	};

	const RenderMap = () => {
		if (elements.length > 0) {
			return (
				<div>
					{
						loading ?
							<Spinner />
							:
							<CytoscapeComponent layout={layout}
								elements={CytoscapeComponent.normalizeElements({
									nodes:
										elements
									,
									edges:
										connections
								})}



								style={{ width: '100%', marginTop: '32px', height: 'calc(100vh - 200px)', backgroundColor: '#ffffff', border: '1px solid #BDBDBD' }}
								stylesheet={[
									// {
									// 	selector: 'node',
									// 	style: {
									// 		backgroundColor: '#0A22FF',
									// 		borderColor: "#0A22FF",
									// 		borderWidth: 1,
									// 		borderRadius: 8,
									// 		width: 180,
									// 		height: 40,
									// 		shape: 'rectangle',

									// 	}

									// },
									{
										selector: 'node[label]',

										style: {
											label: 'data(label)',
											color: '#ffffff',
											'text-halign': 'center',
											'text-valign': 'center',
											'font-family': 'Ubuntu, sans-serif',
											'font-size': 12,
											'font-weight': 'bold',
											'text-background-color': '#0A22FF',
											'text-background-padding': '20px',
											'text-background-opacity': 1,
											'text-border-color': '#0A22FF',
											'text-border-style': 'solid',
											'text-border-width': 0.5,
											'text-border-opacity': 1,
											'padding': 30,
											'background-color': '#FFFFFF'
										}
									},
									{
										selector: 'edge',
										style: {
											'width': 1,
											'line-color': '#444444',
											'target-arrow-color': '#444444',
											'target-arrow-shape': 'triangle',
											'curve-style': 'bezier',
											'z-compound-depth': 'top'

										}
									},
									{
										selector: 'edge[label]',
										style: {
											label: 'data(label)',
											'font-family': 'Ubuntu, sans-serif',
											'font-size': 12,
											'font-weight': 'bold',

											'text-background-color': 'white',
											'text-background-opacity': 1,
											'text-background-padding': '2px',

											'text-border-color': 'black',
											'text-border-style': 'solid',
											'text-border-width': 0.5,
											'text-border-opacity': 1

											// "text-rotation": "autorotate"
										}
									}
								]}

							/>
					}
				</div>
			);
		} else {
			return (
				<></>
			);
		}
	};

	const GetSoftwares = async () => {
		setLoading(true);
		axios.all([
			await axios.post('/api/getSoftwares'),
			await axios.post('/api/getIntegrations')

		])
			.then(axios.spread((softwares, integrations) => {
				setElements(
					softwares.data.data.map(({ title }) => {
						return {
							data: {
								id: title,
								label: title
							}

						};
					})
				),
				setConnections(
					integrations.data.data.map(({ title, id, start_software, end_software }) => {
						return {
							data: {
								id: id,
								label: title,
								source: start_software,
								target: end_software
							}

						};
					})
				);
			}
			))

			.catch(err => {
				console.log(err);
			})
			.finally(() => {

				setLoading(false);
			});

	};
	useEffect(() => {
		
		GetSoftwares();

	}, []);
	return (
		<Wrapper>
			{
				context.loading ?
					<Spinner />
					:
					RenderMap()
			}
		</Wrapper>
	);
};

export default IntegrationsMap;