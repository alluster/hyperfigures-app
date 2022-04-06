const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');
const GoogleSpreadsheetDataPointType = require('./GoogleSpreadsheetDataPointType');

const DataPointGroupType = new GraphQLObjectType({
	name: 'DataPointGroup',
	fields: () => ({
		id: { type: GraphQLInt },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString },
		google_spreadsheet_data_points: { type: new GraphQLList(GoogleSpreadsheetDataPointType)}
	})
});


module.exports = DataPointGroupType