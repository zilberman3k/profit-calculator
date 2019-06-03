import React from 'react'
import StoryCard from './Story/StoryCard'
import { Query } from 'react-apollo'
import { GET_FEED , GET_USER_ENTRIES} from '../queries'


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

export default Home