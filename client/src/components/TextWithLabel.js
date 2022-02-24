import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-right: ${props => props.theme.grid.divider_4};
`;

const Label = styled.p`
	color: ${props => props.theme.colors.gray_130};
	font-size: 14px;
`;

const TextWithLabel = ({
	title,
	label
}) => {

	return (
		<Wrapper>
			<Label>{label || "-"}</Label>
			<h4>{title || "-"}</h4>
		</Wrapper>
	);
};

export default TextWithLabel;