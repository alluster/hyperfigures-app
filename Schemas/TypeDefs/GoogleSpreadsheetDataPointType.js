const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');
var GraphQLDate = require('graphql-date');

const GoogleSpreadsheetDataPointType = new GraphQLObjectType({
	name: 'GoogleSpreadsheetDataPoint',
	fields: () => ({
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		org_id: { type: GraphQLString },
		service_account: { type: GraphQLString },
		cell: { type: GraphQLString},
		sheet_id: { type: GraphQLString },
		spreadsheet_id: { type: GraphQLString },
		created_at: { type: GraphQLDate },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString }
	})
});


module.exports = GoogleSpreadsheetDataPointType;
