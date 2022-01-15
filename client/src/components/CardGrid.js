import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Grid = styled.div`
	margin-top: ${props => props.theme.grid.divider_8};

`;

const Wrapper = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-content: flex-start;
	row-gap: 24px;
	column-gap: 24px;
	width: 100%;
	margin-top: ${props => props.theme.grid.divider_4};
	${({ ListViewOpen }) => ListViewOpen && `
		flex-flow: column;
		

	`}
	@media ${device.laptop} {
	}
`;

const GridHeader = styled.div`
	display: flex;
	flex-direction: row no-wrap;
	align-items: center;
	border-bottom: 1px solid ${props => props.theme.colors.gray_60};
	margin-bottom: 24px;
	width: 100%;
	
	
`;

const ListToggler = styled.div`
	display: flex;
	flex-direction: row no-wrap;
	margin-left: auto;
	align-items: center;
	margin-bottom: 24px;
	&:hover{
		cursor: pointer;
	}
`;

const Title = styled.h5`
`;


const Icon = styled(FontAwesomeIcon)`
	color: ${props => props.theme.colors.fontDark};
	font-size: 16px;
	`;


const CardGrid = ({ children, title, defaultView }) => {
	const [ListView, setListView] = useState(defaultView || false);

	return (
		<Grid>
			<GridHeader>
				<Title>{title || ''}</Title>


				{
					ListView ?
						<ListToggler onClick={() => setListView(!ListView)}>
							<Icon icon={faTh} />
							<h6 style={{ marginLeft: '16px' }}>Korttinäkymä</h6>
						</ListToggler>
						:
						<ListToggler onClick={() => setListView(!ListView)}>
							<Icon icon={faList} />
							<h6 style={{ marginLeft: '16px' }}>Listanäkymä</h6>
						</ListToggler>
				}

			</GridHeader>
			<Wrapper ListViewOpen={ListView}>
				{children}
			</Wrapper>
		</Grid>

	);
};

export default CardGrid;