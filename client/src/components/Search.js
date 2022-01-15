import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';
import CardGrid from './CardGrid';
import Card from './Card';


const Input = styled.input`
	height: 60px;
	width: 100%;
	border-radius: 30px;
	border: 1px solid ${props => props.theme.colors.gray_60};
	padding-left: 32px;
	color: ${props => props.theme.colors.gray_60};
	font-size: 23px;
	line-height: 60px;
	margin-top: ${props => props.theme.grid.divider_4};
	margin-bottom: ${props => props.theme.grid.divider_4};

	@media ${device.laptop} {
	}
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;

	@media ${device.laptop} {
	}
`;


const Search = () => {
	const context = useContext(AppContext);
	const [value, setValue] = useState('');
	const [applicationList, setApplicationList] = useState(context.applications || []);
	const HandleChange = (e) => {
		e.preventDefault();
		setValue(e.target.value);
		setApplicationList(context.applications.filter(item => item.name.includes(value)));
		value === '' && setApplicationList(context.applications);
	};
	const ViewList = () => {
		return (
			<CardGrid>
				{
					applicationList.map((item, i) => {
						return (
							<Card
								cardType="application"
								key={i}
								title={item.name}
								image={item.imageUrl}
								description={item.provider}
								to={`/applications/${item.name}`}
							/>
						);
					})
				}
			</CardGrid>
		);
	};

	return (
		<Wrapper>
			<Input placeholder="Etsi sovellus nimellä" value={value} onChange={e => HandleChange(e)} />
			{ViewList()}
			<CardGrid>
				{
					applicationList.map((item, i) => {
						return (
							<Card
								cardType="application"
								key={i}
								title={item.name}
								image={item.imageUrl}
								description={item.provider}
								to={`/applications/${item.name}`}
							/>
						);
					})
				}
			</CardGrid>
		</Wrapper>
	);
};

export default Search;