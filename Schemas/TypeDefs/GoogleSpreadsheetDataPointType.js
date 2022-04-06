const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');

const GoogleSpreadsheetDataPointType = new GraphQLObjectType({
	name: 'GoogleSpreadsheetDataPoint',
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		value: { type: GraphQLFloat },
		description: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString }
	})
});


module.exports = GoogleSpreadsheetDataPointType