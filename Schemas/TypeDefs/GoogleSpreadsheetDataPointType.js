const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');

const GoogleSpreadsheetDataPointType = new GraphQLObjectType({
	name: 'GoogleSpreadsheetDataPoint',
	fields: () => ({
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		value: { type: GraphQLFloat },
		group_id: { type: GraphQLFloat },
		description: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString },
		cell: { type: GraphQLString },
		sheet: { type: GraphQLString },
		spreadsheet: { type: GraphQLString },
		org_id: { type: GraphQLString },
		creator: { type: GraphQLString }
	})
});


module.exports = GoogleSpreadsheetDataPointType
