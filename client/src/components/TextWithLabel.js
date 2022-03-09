import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-right: ${props => props.theme.grid.divider_4};
	margin-bottom: ${props => props.theme.grid.divider_1}

`;

const Label = styled.p`
	color: ${props => props.theme.colors.fontDark};
	font-size: 14px;
	font-weight: 400;
	text-transform: uppercase;
	margin-bottom: ${props => props.theme.grid.divider_1}
`;

const TextWithLabel = ({
	title,
	label
}) => {

	return (
		<Wrapper>
			<Label>{label || "-"}</Label>
			<h5>{title || "-"}</h5>
		</Wrapper>
	);
};

export default TextWithLabel;