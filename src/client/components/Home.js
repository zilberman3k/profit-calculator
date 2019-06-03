import React from 'react'
import StoryCard from './Story/StoryCard'
import { Query } from 'react-apollo'
import { GET_FEED , GET_USER_ENTRIES,GET_CURRENT_USER} from '../queries'
import UserEntries from './Profile/UserEntries';

const Home = () => (
	<div>
		<Query query={GET_FEED}>
			{({ loading, error, data, fetchMore }) => {
				if (loading || !data) return <div>Loading...</div>
				const { cursor, stories, entries } = data.getFeed
				console.error(cursor);
				return (
					<div className="Home">
						{}
						{stories.map(story => <StoryCard story={story} key={story.id}/>)}
						<div className="center">
							<button
								onClick={() => {
									fetchMore({
										query: GET_FEED,
										variables: { cursor },
										updateQuery: (previousResult, { fetchMoreResult }) => {
											if (
												!fetchMoreResult ||
												fetchMoreResult.getFeed.stories.length ===0
											) {
												return previousResult
											}

											return {
												getFeed: {
													cursor: fetchMoreResult.getFeed.cursor,
													stories: [
														...previousResult.getFeed.stories,
														...fetchMoreResult.getFeed.stories
													],
													__typename: 'Feed'
												}
											}
										}
									})
								}}
							>
								Load more
							</button>
						</div>
					</div>
				)
			}}
		</Query>

	</div>
)

const Home2 = () => (
	<div>
		<Query query={GET_CURRENT_USER}>
            {({ loading, error, data, fetchMore }) => {
            	if (loading || !data || !data.getCurrentUser) return <div>Loading...</div>
                const { entries } = data.getCurrentUser;
                return (
					<div className="Home">
						<UserEntries entries={entries} />
					</div>
                )
            }}
		</Query>

	</div>
)

export default Home2