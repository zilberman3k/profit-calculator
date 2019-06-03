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
            id
            name
            symbol
            slug
            rank
        }
    }
`;

export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			email
			username
			favorites {
				id
				title
			}
			entries{
				id
				date
				coin
				amount
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

export const ADD_ENTRY = gql`
    mutation addEntryMutation( $id: String!, $date: String!, $coin: String!, $amount: Float! ) {
            addEntry (	id: $id,
                        date: $date,
                        coin: $coin,
                        amount: $amount ) {
                id
                date
                coin
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