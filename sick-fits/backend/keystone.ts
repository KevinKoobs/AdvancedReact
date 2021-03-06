import 'dotenv/config';
import {config, createSchema} from "@keystone-next/keystone/schema";
import {User} from "./schemas/User";
import {Product} from "./schemas/Product";
import {ProductImage} from "./schemas/ProductImage";
import {createAuth} from "@keystone-next/auth";
import {statelessSessions, withItemData} from "@keystone-next/keystone/session";
import {insertSeedData} from "./seed-data";

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
		async onConnect(keystone) {
			if(process.argv.includes('--seed-data')) {
				await insertSeedData(keystone);
			}
		}
	},
	lists: createSchema({
		// Schema items go in here
		User,
		Product,
		ProductImage,
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
