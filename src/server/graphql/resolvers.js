const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const all = Promise.all.bind(Promise);

const resolvers = {
    Query: {
        getCoins: async (root, _, ctx) => {
            // todo : export string to consts
            const coins = await axios.get('https://s2.coinmarketcap.com/generated/search/quick_search.json');
            const {data = []} = coins;
            return data.map(c => {
                return {tokens: c.tokens.join(',')}
            })
        },
        getProfitOfEntry: async (root, {date, coin, amount, slug}, context) => {
            // todo : export string to consts
            const string = `https://graphs2.coinmarketcap.com/currencies/${slug}/${date}/${Date.now()}/`;

            const result = await axios.get(string);
            const {price_usd} = result.data;
            return (+amount) * (price_usd.slice(-1)[0][1] - price_usd[0][1]) + '';
        },
        getTotalProfitOfUser: async (root, args, ctx) => {
           // todo : finish function
            return await 72.93;
        },
        getUserByUserName: async (root, {username}, ctx) => {
            const user = await ctx.User.findOne({username})
                .populate({
                    path: 'entries',
                    model:'Entry',
                })
            return user;
        },
        getCurrentUser: async (root, args, {currentUser, User, Entry}) => {
            if (!currentUser) {
                return null
            }
            let total = 0;
            const user = await User.findOne({username: currentUser.username})
                .populate({path: 'entries', model: 'Entry'});
            for (let entry of user.entries) {
                total += await resolvers.Entry.profit(entry);

            }
            user.total = total;
            return user
        },
        getFeed: async (root, {cursor}, {Story}) => {
            // stories per page

            const limit = 5
            let stories = []

            if (cursor) {
                stories = await Story.find({_id: {$lt: cursor}})
                    .sort({createdAt: -1})
                    .limit(limit)
                    .exec()
            } else {
                stories = await Story.find({})
                    .sort({createdAt: -1})
                    .limit(limit)
                    .exec()
            }
            // cursor is length -1 element
            cursor = stories.length > 0 ? stories[stories.length - 1].id : cursor
            return {
                cursor,
                stories,
            }
        },
        getStory: async (root, {id}, {Story}) => {
            const story = await Story.findById(id)
            return story
        },
        getUserStories: async (root, {username}, {Story}) => {
            const stories = await Story.find({author: username});
            return stories
        },
        getStoriesByCategory: async (root, {category}, {Story}) => {
            try {
                const stories = await Story.find({category: category})
                    .sort({createdAt: -1, likes: 'desc'})
                    .exec()
                return stories
            } catch (error) {
                throw new Error('Something went wrong')
            }
        },
        searchStories: async (root, {searchText}, {Story}) => {
            let stories
            if (searchText) {
                stories = await Story.find({
                    $text: {$search: searchText}
                })
                    .sort({createdAt: -1, likes: 'desc'})
                    .exec()
            } else {
                stories = await Story.find({})
                    .limit(10)
                    .sort({createdAt: -1, likes: 'desc'})
                    .exec()
            }
            return stories
        }
    },

    Entry: {
        profit: async ({valueAtBuying, slug, amount}) => {
            if (valueAtBuying) {
                const string = `https://graphs2.coinmarketcap.com/currencies/${slug}/${Date.now() - 18000000}/${Date.now()}/`;
                const result = await axios.get(string);
                let valueNow = null;
                try {
                    const {price_usd} = result.data;
                    valueNow = price_usd.slice(-1)[0][1];
                } catch (e) {
                }
                if (valueNow !== null) {
                    return  amount * (valueNow - valueAtBuying);
                }
            }

            return null;
        }
    },
    Mutation: {
        setProfitOfUser: async (root, {profits = []}) => {
            return await profits.reduce((a, b) => a + b, 0);
        },
        addEntry: async (root, {
            date,
            coin,
            slug,
            amount,
        }, {currentUser, Entry, User}) => {


            console.log('addEntry - ', date, coin, slug, amount);


            const timeDate = (new Date(date)).getTime();
            // todo : export string to consts
            const string = `https://graphs2.coinmarketcap.com/currencies/${slug}/${timeDate}/${(timeDate + 300000)}/`;
            const result = await axios.get(string);
            let valueAtBuying = 0;
            try {
                const {price_usd} = result.data;
                valueAtBuying = price_usd[0][1]
            } catch (e) {
            }


            const newEntry = await new Entry({
                date,
                coin,
                slug,
                amount,
                valueAtBuying
            }).save();
            const {_id} = newEntry;
            const user = await User.findOneAndUpdate(
                {username: currentUser.username},
                {$addToSet: {entries: _id}}
            );

            return newEntry
        },
        editEntry: async (root, {
            id,
            date,
            coin,
            slug,
            amount,
        }, {currentUser, Entry, User}) => {
            const timeDate = (new Date(date)).getTime();
            const string = `https://graphs2.coinmarketcap.com/currencies/${slug}/${timeDate}/${Date.now()}/`;
            const result = await axios.get(string);
            let valueAtBuying = 0;
            try {
                const {price_usd} = result.data;
                valueAtBuying = price_usd[0][1]
            } catch (e) {
            }


            const nextEntry = await Entry.findOneAndUpdate({_id: id}, {
                date,
                coin,
                slug,
                amount,
                valueAtBuying
            }).exec();
            return await nextEntry;
        },

        deleteEntry: async (root, {id}, {currentUser, Entry, User}) => {
            const [nextEntry] = await all([
                Entry.findOneAndRemove({_id: id}),
                User.findOneAndUpdate({username: currentUser.username}, {$pull: {entries: id}})
            ]);

            return nextEntry;
        },
        signupUser: async (root, {username, password, email}, {User}) => {
            // find user with username
            const user = await User.findOne({username});
            if (user) {
                throw new Error('Username was used')
            }
            // create hash password
            const salt = bcrypt.genSaltSync(10);
            const hash_password = bcrypt.hashSync(password, salt);
            // save new user to database
            const newUser = new User({
                username,
                password: hash_password,
                email
            })
            await newUser.save()
            // create token with user data
            const token = jwt.sign({username, email}, process.env.SECRET, {expiresIn: '1d'});
            // return token to client
            return {token}
        },
        signinUser: async (root, {username, password}, {User}) => {
            // find user with username
            const user = await User.findOne({username});
            if (!user) {
                throw new Error('User not found')
            }
            // check password and hash password is same
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                throw new Error('Password invalid')
            }
            // create token with user data
            const token = jwt.sign(
                {
                    username, email: user.email
                },
                process.env.SECRET,
                {expiresIn: '1d'}
            )
            // return token to client
            return {token}
        }
    }
};
export default resolvers;
