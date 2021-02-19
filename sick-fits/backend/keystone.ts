import 'dotenv/config';
import {config, createSchema} from "@keystone-next/keystone/schema";
import {User} from "./schemas/User";
import {Product} from "./schemas/Product";
import {createAuth} from "@keystone-next/auth";
import {statelessSessions, withItemData} from "@keystone-next/keystone/session";

const dbURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360,
	secret: process.env.COOKIE_SECRET,
};

const {withAuth} = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		// TODO: Add in initial roles here
	}
})

export default withAuth(config({
	server: {
		cors: {
			origin: [process.env.FRONTEND_URL],
			credentials: true,
		},
	},
	db: {
		adapter: 'mongoose',
		url: dbURL,
		// TODO: Add data seeding here
	},
	lists: createSchema({
		// Schema items go in here
		User,
		Product,
	}),
	ui: {
		// Show the UI only for people wo pass this test
		isAccessAllowed: ({session}) => {
			return !!session?.data; // Returns boolean
		},
	},
	// TODO: Add session values here
	session: withItemData(statelessSessions(sessionConfig), {
		// GraphQL query
		User: `id`
	})
}));
