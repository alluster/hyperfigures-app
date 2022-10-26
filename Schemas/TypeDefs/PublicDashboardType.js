const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');
const DataPointGroupType = require('./DataPointGroupType');
const GoogleSpreadsheetDataPointType = require('./GoogleSpreadsheetDataPointType');

const PublicDashboardType = new GraphQLObjectType({
	name: 'PublicDashboard',
	fields: () => ({
		id: { type: GraphQLInt },
		org_id: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString },
		deleted_at: { type: GraphQLString },
		dashboard_data: { type: GraphQLString },
		dashboard_id: { type: GraphQLInt }
		
	})
});


module.exports = PublicDashboardType;