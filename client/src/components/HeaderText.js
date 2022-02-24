import React from 'react';
import styled from 'styled-components';

const HeaderTextWrapper = styled.div`
* {
	margin-bottom: ${props => props.theme.grid.divider_1}
   }
`;

const HeaderText = ({
	locationText,
	title,
	description
}) => {
	return (
		<HeaderTextWrapper>
			<h6>{locationText || ""}</h6>
			<h4>{title || ""}</h4>
			<h5>{description || ""}</h5>
		</HeaderTextWrapper>

	)
}

export default HeaderText;