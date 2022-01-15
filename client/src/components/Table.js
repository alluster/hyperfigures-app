

import React, { useState } from 'react';
import styled from 'styled-components';

import { device } from '../device';
import Button from './Button';

const Wrapper = styled.div`
	width: 100%;
`;


const TableContainer = styled.table`
	width: 100%;
	margin-top: ${props => props.theme.grid.divider_4};
	border-collapse: collapse; 
	@media ${device.laptop} {
	}
`;
const TableRow = styled.tr`
	height: 45px;
	&:nth-child(odd) {
		background: #F3F3F3
	}
	@media ${device.laptop} {
	}
`;
const TableHeader = styled.th`
	text-align: left;
	font-weight: 400;
	font-size: 16px;
	@media ${device.laptop} {
	}
`;
const TableData = styled.td`
	text-align: right;
	font-weight: 400;
	font-size: 22.6px;
	@media ${device.laptop} {
	}
`;
const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${props => props.theme.grid.divider_4};
	margin-left: auto;
`;
const Table = ({ items }) => {
	const [showTable, setShowTable] = useState(true);


	return (
		<div>
			{
				showTable ?
					<div>
						<div style={{ alignSelf: 'center', marginLeft: 'auto', width: '100%' }}>
							{/* 
						<Button small white onClick={() => setShowTable(!showTable)}>
							Piilota tiedot
					</Button> */}
						</div>
						<TableContainer>
							<tbody>
								{
									items.map((item, i) => {
										return (
											<TableRow key={i}>
												<TableHeader>
													{item.header || '-'}
												</TableHeader>
												<TableData>
													{item.data || '-'}
												</TableData>
											</TableRow>
										);
									})
								}
							</tbody>
						</TableContainer>
					</div>

					:
					<div style={{ alignSelf: 'center', marginLeft: 'auto', width: '100%' }}>
						<Button small white onClick={() => setShowTable(!showTable)}>
							Naytä tiedot
						</Button>
					</div>

			}

		</div >

	);
};

export default Table;