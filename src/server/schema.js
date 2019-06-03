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
        slug: String!
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
		getCoins: [Coin]
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