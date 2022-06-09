const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');
const DataPointGroupType = require('./DataPointGroupType');
const GoogleSpreadsheetDataPointType = require('./GoogleSpreadsheetDataPointType');

const DashboardType = new GraphQLObjectType({
	name: 'Dashboard',
	fields: () => ({
		id: { type: GraphQLString },
		org_id: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString },
		// data_point_groups: { type: new GraphQLList(DataPointGroupType) },
		// google_spreadsheet_data_points: { type: new GraphQLList(GoogleSpreadsheetDataPointType) }
	})
});


module.exports = DashboardType;