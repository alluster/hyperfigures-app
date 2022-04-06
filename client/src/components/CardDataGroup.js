import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { Link } from 'react-router-dom';
import Card from './Card';
import TextWithLabel from './TextWithLabel';
import CurrencyFormatter from '../supportFunctions/CurrencyFormatter';

const Description = styled.p`
	margin-bottom: ${props => props.theme.grid.divider_2};
`;
const Updated = styled.p`
	margin-bottom: ${props => props.theme.grid.divider_2};
`;

const CardDataGroup = ({ dataPoints, title, description, updated_at }) => {
	const [data, setData] = useState([]);
	const DataPointsList = () => {
		if (data && data.length > 0) {
			data.map((item, i) => {
				return (
					<p>{item.value}</p>
				)
			})

		}
		else {
			<p>This data point group does'nt contain any data</p>
		}
	}
	useEffect(() => {
		DataPointsList();
		console.log("datapoints:", dataPoints)
		setData(dataPoints);
	}, [dataPoints])
	return (
		<Card>
			<TextWithLabel
				title={title}
				label={"Data Point Group"}
				
			/>
			<Updated>{updated_at || ''}</Updated>
			<Description>{description || ''}</Description>
			{
				data ?
					data.map((item, i) => {
						return (
							<TextWithLabel
								key={i}
								label={item.title}
								title={CurrencyFormatter.format(item.value)}
								small
							/>)
					}) :
					<p>no data</p>
			}
		</Card>

	);
};

export default CardDataGroup;