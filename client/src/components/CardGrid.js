import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import styled from 'styled-components';

const CardGridWrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
`;


const CardGrid = ({ children }) => {
	return (
		<CardGridWrapper>
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 350: 1, 750: 2, 1200: 3 }}
			>
				<Masonry>
					{children}
				</Masonry>
			</ResponsiveMasonry>
		</CardGridWrapper>

	)
}


export default CardGrid;