import gql from 'graphql-tag'

export const SIGNUP_USER = gql`
	mutation signupUser($username: String!, $email: String!, $password: String!) {
		signupUser (username: $username, email: $email, password: $password) {
			token
		}
	}
`

export const SIGNIN_USER = gql`
	mutation signinUser($username: String!, $password: String!) {
		signinUser (username: $username, password: $password) {
			token
		}
	}
`
export const GET_COINS = gql`
    query getCoins {
        getCoins {
            tokens
        }
    }
`;

export const GET_PROFIT_OF_ENTRY = gql`
    query getProfitOfEntry($date:String,$coin:String, $slug:String,$amount:Float){
		getProfitOfEntry(date:$date,coin:$coin,slug:$slug,amount:$amount)
		
	}
`;

export const GET_TOTAL_PROFIT_OF_USER = gql`
    query getTotalProfitOfUser{
        getTotalProfitOfUser
    }
`;

export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			email
			username
            total
			entries{
				id
				date
				slug
				coin
				amount
				profit
			}
			
		}
	}
`



export const GET_FEED = gql`
	query getFeedQuery ($cursor: String) {
		getFeed (cursor: $cursor) {
			cursor
			stories {
				id
				title
				imageUrl
				category
				likes
				author
			}
			
		}
	}
`

export const GET_STORY = gql`
	query getStoryQuery ($id: ID!) {
		getStory (id: $id) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
		}
	}
`

export const GET_USER_STORIES = gql`
	query getUserStories ($username: String!) {
		getUserStories (username: $username) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
			author
		}
	}
`;
export const GET_USER_ENTRIES = gql`
	query getUserEntries ($username: String!){
		getUserEntries (username: $username){
			id
			date
			coin
			amount
		}
	}
`;

export const GET_STORIES_BY_CATEGORY = gql`
	query getStoriesByCategoryQuery ($category: String!) {
		getStoriesByCategory (category: $category) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
			author
		}
	}
`

export const SEARCH_STORIES = gql`
	query searchStoriesQuery ($searchText: String) {
		searchStories(searchText: $searchText) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
			author
		}
	}
`

export const SET_PROFIT_OF_USER = gql`
    mutation setProfitOfUser($profits: [Float]) {
        setProfitOfUser(profits:$profits)
    }
`;

export const ADD_ENTRY = gql`
    mutation addEntryMutation( $date: String!, $coin: String!,$slug: String!, $amount: Float! ) {
            addEntry (  date: $date,
                        coin: $coin,
						slug: $slug,
                        amount: $amount ) {
                id
                date
                coin
				slug
                amount
            }
        }
`;

export const EDIT_ENTRY = gql`
    mutation editEntryMutation( $id: ID!, $date: String!, $coin: String!,$slug: String!, $amount: Float! ) {
        editEntry (	id: $id,
            date: $date,
            coin: $coin,
            slug: $slug,
            amount: $amount ) {
            id
            date
            coin
            slug
            amount
        }
    }
`;

export const DELETE_ENTRY = gql`
    mutation deleteEntryMutation( $id: ID!) {
        deleteEntry (id: $id) {
            id
            date
            coin
            slug
            amount
        }
    }
`;


export const ADD_STORY = gql`
	mutation addStoryMutation(
					$title: String!, 
					$category: String!, 
					$description: String!,
					$text: String!,
					$imageUrl: String!
				) {
		addStory (	title: $title,
					description: $description,
					text: $text,
					imageUrl: $imageUrl,
					category: $category ) {
			id
			title
			description
			imageUrl
			category
			text
			author
			createdAt
		}
	}
`

export const DELETE_STORY = gql`
	mutation deleteStoryMutation ($id: ID!) {
		deleteStory (id: $id) {
			id
			title
			description
			imageUrl
			category
			text
			author
			createdAt
		}
	}
`


export const LIKE_STORY = gql`
	mutation likeStoryMutation ($id: ID!) {
		likeStory (id: $id) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
		}
	}
`

export const UNLIKE_STORY = gql`
	mutation unlikeStoryMutation ($id: ID!) {
		unlikeStory (id: $id) {
			id
			title
			imageUrl
			description
			category
			text
			createdAt
			likes
		}
	}
`