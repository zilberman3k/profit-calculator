exports.typeDefs = `
	type User {
		username: String!
		email: String!
		favorites: [Story]
		entries: [Entry]
	}
    type Coin {
        id: String!,
        name: String!,
        symbol: String!,
        rank: String!,
        price_usd: String!,
        price_btc: String!,
        h24_volume_usd: String!,
        market_cap_usd: String!,
        available_supply: String!,
        total_supply: String!,
        percent_change_1h: String!,
        percent_change_24h: String!,
        percent_change_7d: String!
    }
 
    type Entry{
        id: String!
        date: String!
        coin: String!
        amount: Float!
    }

	type Story {
		id: ID!
		title: String!
		imageUrl: String!
		description: String!
		category: String!
		author: String!
		createdAt: String!
		text: String!
		likes: Int!
	}	

	type Token {
		token: String!
	}

	type Feed {
		cursor: String!
		stories: [Story]
		entries: [Entry]
	}

	type Query {
		getCurrentUser: User
		getFeed(cursor: String): Feed
		getStory(id: ID!): Story
		getUserStories(username: String!): [Story]
		getUserEntries(username: String!): [Entry]
		getStoriesByCategory(category: String!): [Story]
		searchStories(searchText: String): [Story]
	}

	type Mutation {
		addEntry(
		    id:String!
		    date:String!
		    coin:String!
		    amount:Float!
		): Entry
		addStory(
			title: String!
			imageUrl: String!
			description: String!
			category: String!
			text: String!
		): Story
		deleteStory(id: ID!): Story
		signupUser(username: String!, password: String!, email: String!): Token!
		signinUser(username: String!, password: String!): Token!
		likeStory (id: ID!): Story
		unlikeStory(id: ID!): Story
	}

`;