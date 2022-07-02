const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLID, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');
const graphql = require('graphql');

const GoogleSpreadsheetDataPointType = require('./TypeDefs/GoogleSpreadsheetDataPointType');
const GoogleSpreadsheetDataSourceType = require('./TypeDefs/GoogleSpreadsheetDataSourceType');
const GoogleSpreadsheetIntegration = require( '../GoogleSpreadsheetIntegration');
const DashboardType = require('./TypeDefs/DashboardType');
const GoogleSpreadsheetValueType = require('./TypeDefs/GoogleSpreadsheetValueType');
const GetDashboards = require('../SQL/GetDashboards');
const CreateDashboard = require('../SQL/CreateDashboard');
const GetDashboard = require('../SQL/GetDashboard');
const GetDataPointsGoogleSheets = require('../SQL/GetDataPointsGoogleSheets');
const GetDataSourceGoogleSheets = require('../SQL/GetDataSourceGoogleSheets');
const CreateDataPointGoogleSpreadSheet = require('../SQL/CreateDataPointGoogleSpreadSheet');
const GetDataPointGoogleSheets = require('../SQL/GetDataPointGoogleSheets');
const CreateGoogleSheet = require('../SQL/CreateGoogleSheet');
const GoogleSheetType = require('./TypeDefs/GoogleSheetType');
var GraphQLDate = require('graphql-date');
const UpdateDataPointGoogleSpreadSheet = require('../SQL/UpdateDataPointGoogleSpreadSheet');
const GetGoogleSheets = require('../SQL/GetGoogleSheets');
const GetGoogleSheet = require('../SQL/GetGoogleSheet');


 

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
				sheetId: { type: GraphQLString },
				serviceAccount: { type: GraphQLString },
				org_id: { type: GraphQLString}
			},
			resolve(parent, args) {
				const res = GoogleSpreadsheetIntegration({
					cell: args.cell,
					spreadsheetId: args.spreadsheetId,
					sheetId: args.sheetId,
					serviceAccount: args.serviceAccount,
					org_id: args.org_id
				});
				// 	return GoogleSpreadsheetDataPointData
				
				return res;
			}
		},
		getAllGoogleSpreadsheetDataPoints: {
			type: new GraphQLList(GoogleSpreadsheetDataPointType),
			args: { org_id: { type: GraphQLString } },
			resolve(parent, args) {
				const data = GetDataPointsGoogleSheets(
					args.org_id
				);
				return data;
			}
		},
		getGoogleSpreadsheetDataPoint: {
			type: new GraphQLList(GoogleSpreadsheetDataPointType),
			args: { 
				id: { type: GraphQLString },
				org_id: { type: GraphQLString } 
			},
			resolve(parent, args) {
				const data = GetDataPointGoogleSheets({
					org_id: args.org_id,
					id: args.id
				});
				return data;
			}
		},
		getAllGoogleSpreadsheetDataSources: {
			type: new GraphQLList(GoogleSpreadsheetDataSourceType),
			args: { org_id: { type: GraphQLString } },
			resolve(parent, args) {
				const data = GetDataSourceGoogleSheets(
					args.org_id
				);
				return data;
			}
		},
		getAllDashboards: {
			type: new GraphQLList(DashboardType),
			args: { org_id: { type: GraphQLString } },
			resolve(parent, args) {
				const data = GetDashboards(args.org_id);
				return data;
		
				
			}

		},
		getDashboard: {
			type: new GraphQLList(DashboardType),
			args: { 
				org_id: { type: GraphQLString },
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				const data = GetDashboard({ org_id: args.org_id, id: args.id });
				return data;
			}
		},
		getAllGoogleSheets: {
			type: new GraphQLList(GoogleSheetType),
			args: { org_id: { type: GraphQLString }	},
			resolve(parent, args) {
				const data = GetGoogleSheets(args.org_id);
				return data;
		
				
			}

		},
		getGoogleSheet: {
			type: new GraphQLList(GoogleSheetType),
			args: { 
				org_id: { type: GraphQLString },
				id: { type: GraphQLString }
			},			
			resolve(parent, args) {
				const data = GetGoogleSheet({ org_id: args.org_id, id: args.id });
				return data;	
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
				org_id: { type: GraphQLString },
				id: { type: GraphQLString },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				spreadsheet_id:  { type: GraphQLString },
				sheet_id: { type: GraphQLString },
				sheet_title: {type: GraphQLString },
				cell:  { type: GraphQLString },
				service_account: { type: GraphQLString },
				deleted_at: { type: GraphQLDate }
			},
			resolve(parent, args) {
				CreateDataPointGoogleSpreadSheet({
					org_id: args.org_id,
					title: args.title,
					description: args.description,
					spreadsheet_id:  args.spreadsheet_id,
					sheet_id: args.sheet_id,
					sheet_title: args.sheet_title,
					cell:  args.cell,
					service_account: args.service_account,
					deleted_at: args.deleted_at || null
				});
				return args;
			}
		},
		updateGoogleSpreadsheetDataPoint: {
			type: GoogleSpreadsheetDataPointType,
			args: {
				org_id: { type: GraphQLString },
				id: { type: GraphQLString },
				deleted_at: { type: GraphQLDate }
			},
			resolve(parent, args) {
				UpdateDataPointGoogleSpreadSheet({
					org_id: args.org_id,
					id: args.id,
					deleted_at: args.deleted_at
				});
				return args;
			}
		},
		createDashboard: {
			type: DashboardType,
			args: {
				org_id: { type: GraphQLString },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
			},
			resolve(parent, args) {
				CreateDashboard ({
					org_id: args.org_id,
					title: args.title,
					description: args.description
				});
				return args;
			}
		},
		createGoogleSheet: {
			type: GoogleSheetType,
			args: {
				org_id: { type: GraphQLString },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				spreadsheet_id: { type: GraphQLString },
				sheet_id: { type: GraphQLString }
			},
			resolve(parent, args) {
				CreateGoogleSheet ({
					org_id: args.org_id,
					title: args.title,
					description: args.description,
					spreadsheet_id: args.spreadsheet_id,
					sheet_id: args.sheet_id
				});
				return args;
			}
		}

	}
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
