const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLID, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');
const graphql = require('graphql');
const dashboardData = require('../MOCK_DASHBOARDS.json');
const GoogleSpreadsheetDataPointData = require('../MOCK_GOOGLE_SPREADSHEET_DATA_POINTS.json');
const GoogleSpreadsheetDataPointType = require('./TypeDefs/GoogleSpreadsheetDataPointType');
const DashboardType = require('./TypeDefs/DashboardType');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		getAllGoogleSpreadsheetDataPoints: {
			type: new GraphQLList(GoogleSpreadsheetDataPointType),
			args: { id: { type: GraphQLInt } },
			resolve(parent, args) {
				return GoogleSpreadsheetDataPointData
			}
		},
		getAllDashboards: {
			type: new GraphQLList(DashboardType),
			args: { id: { type: GraphQLInt } },
			resolve(parent, args) {
				return dashboardData
			}
		},
		getDashboard: {
			type: new GraphQLList(DashboardType),
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				const res = dashboardData.filter(x => x.id === args.id)
				return res
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createGoogleSpreadsheetDataPoint: {
			type: GoogleSpreadsheetDataPointType,
			args: {
				id: { type: GraphQLInt },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				value: { type: GraphQLFloat }
			},
			resolve(parent, args) {
				GoogleSpreadsheetDataPointData.push({
					id: GoogleSpreadsheetDataPointData.length + 1,
					title: args.title,
					description: args.description,
					value: args.value
				})
				return args
			}
		},
			createDashboard: {
				type: DashboardType,
				args: {
					id: { type: GraphQLInt },
					title: { type: GraphQLString },
					description: { type: GraphQLString },
					created_at: { type: GraphQLString }

				},
				resolve(parent, args) {
					dashboardData.push({
						id: dashboardData.length + 1,
						title: args.title,
						description: args.description,
						created_at: new Date().toLocaleDateString()

					})
					return args
				}
			}

		}
	});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
