import 'dotenv/config';
import {config, createSchema} from "@keystone-next/keystone/schema";

const dbURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360,
	secret: process.env.COOKIE_SECRET,
};

export default config({
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
	}),
	ui: {
		// TODO: Changes this for roles
		isAccessAllowed: () => true,
	}
	// TODO: Add session values here
});
