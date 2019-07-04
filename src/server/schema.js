exports.typeDefs = `
	type User {
		username: String!
		email: String!

		entries: [Entry]
		total:Float
	}
    type Coin {
        tokens:String
    } 
    
 
 
    type Entry{
        id: ID!
        date: String!
        coin: String!
        slug: String!
        amount: Float!
        valueAtBuying: Float
        profit: Float
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
		getProfitOfEntry(date:String,coin:String,slug:String,amount:Float):String
		getTotalProfitOfUser:Float
		getFeed(cursor: String): Feed
		getStory(id: ID!): Story
		getUserStories(username: String!): [Story]
		getUserEntries(username: String!): [Entry]
		getStoriesByCategory(category: String!): [Story]
		searchStories(searchText: String): [Story]
		getUserByUserName(username: String!):User
	}

	type Mutation {
		setProfitOfUser(profits: [Float]):Float
		deleteEntry(id:ID!):Entry
		addEntry(
		    date:String!
		    coin:String!
		    slug:String!
		    amount:Float!
		): Entry
		editEntry(
		    id:ID!
		    date:String!
		    coin:String!
		    slug:String!
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