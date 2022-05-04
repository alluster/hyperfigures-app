const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLID, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');
const graphql = require('graphql');
const dashboardData = require('../MOCK_DASHBOARDS.json');
const GoogleSpreadsheetDataPointData = require('../MOCK_GOOGLE_SPREADSHEET_DATA_POINTS.json');
const GoogleSpreadsheetDataSourceData = require('../MOCK_GOOGLE_SPREADSHEET_DATA_SOURCES.json');
const GoogleSpreadsheetDataPointType = require('./TypeDefs/GoogleSpreadsheetDataPointType');
const GoogleSpreadsheetDataSourceType = require('./TypeDefs/GoogleSpreadsheetDataSourceType');
const GoogleSpreadsheetIntegration = require( '../GoogleSpreadsheetIntegration');
const DashboardType = require('./TypeDefs/DashboardType');
const GoogleSpreadsheetValueType = require('./TypeDefs/GoogleSpreadsheetValueType');


// cell: "C32",
// spreadsheetId: "1m-tkTPGZHyx5DVw9VP86uGckmeAc_CUaQHO6IuSmuIs",
// sheetId: "154788337"

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		getValueFromGoogleSpreadsheet: {
			type: new GraphQLList(GoogleSpreadsheetValueType),
			args: { 
				cell: { type: GraphQLString }, 
				spreadsheetId: { type: GraphQLString },
				sheetId: { type: GraphQLString }
			},
			resolve(parent, args) {
				const res = GoogleSpreadsheetIntegration({
					cell: args.cell,
					spreadsheetId: args.spreadsheetId,
					sheetId: args.sheetId
				});
				// 	return GoogleSpreadsheetDataPointData
				
				return res
			}
		},
		getAllGoogleSpreadsheetDataPoints: {
			type: new GraphQLList(GoogleSpreadsheetDataPointType),
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return GoogleSpreadsheetDataPointData
			}
		},
		getGoogleSpreadsheetDataPoint: {
			type: new GraphQLList(GoogleSpreadsheetDataPointType),
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				const res = GoogleSpreadsheetDataPointData.filter(x => x.id === args.id)
				return res
			}
		},
		getAllGoogleSpreadsheetDataSources: {
			type: new GraphQLList(GoogleSpreadsheetDataSourceType),
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return GoogleSpreadsheetDataSourceData
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
				spreadsheet_id:  { type: GraphQLString },
				sheet_id: { type: GraphQLString },
				cell:  { type: GraphQLString }
			},
			resolve(parent, args) {
				GoogleSpreadsheetDataPointData.push({
					id: GoogleSpreadsheetDataPointData.length + 1,
					title: args.title,
					description: args.description,
					spreadsheet_id:  args.spreadsheet_id,
					sheet_id: args.sheet_id,
					cell:  args.cell
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
