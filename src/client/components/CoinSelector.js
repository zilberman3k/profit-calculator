import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Query} from 'react-apollo'
import { GET_COINS} from '../queries'
import '../styles/coin-picker.scss';

export class CoinSelector extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
        defaultCoin: PropTypes.string,
        onClick: PropTypes.func
    };
    static defaultProperty = {
        suggestions: [],
    };

    static getCoinBySelectedText = (suggestions, text) => {
        const names = suggestions.map(c => c.split(',')[0].toLowerCase());
        const idx = names.indexOf(text.toLowerCase());
        return suggestions[idx].split(',');
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: props.defaultCoin || ''
        };
        if (props.defaultCoin) {
            const [name, slug] = CoinSelector.getCoinBySelectedText(props.suggestions, props.defaultCoin);
            this.updateParentWithSelectedCoin(name, slug);
        }
    }

    updateParentWithSelectedCoin = (name, slug) => {
        this.props.onClick && this.props.onClick(name, slug);
    };

    onChange = e => {
        const {suggestions} = this.props;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onFocus = e => {
        this.setState({showSuggestions: true});
    };

    onBlur = e => {
        this.setState({showSuggestions: false});
    };

    onClick = (name, slug, e) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: name,
            name,
            slug
        }, this.updateParentWithSelectedCoin(name, slug));
    };
    onKeyDown = e => {

        const {activeSuggestion, filteredSuggestions, name = ''} = this.state;

        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            const [nextName, nextSlug] = filteredSuggestions[activeSuggestion].split(',');
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: nextName,
                name: nextName,
                slug: nextSlug
            }, this.updateParentWithSelectedCoin(nextName, nextSlug));
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion - 1});
        } else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion + 1});
        }
        else if (e.keyCode === 27) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: name
            });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className = null;
                            const [name, slug, symbol] = suggestion.split(',');
                            if (index === activeSuggestion) {
                                className = "marked";
                            }

                            return (
                                <li key={suggestion} slug={slug} name={name} className={className}
                                    onClick={onClick.bind(this, name, slug)}>
                                    {name} - ({symbol})
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions</em>
                    </div>
                );
            }
        }

        return (
            <React.Fragment>
                <input
                    placeholder="Coin"
                    className="search"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    required={true}
                />
                {suggestionsListComponent}
            </React.Fragment>
        );
    }
}

const CoinSelectorWrapper = (props) => {

    return <Query query={GET_COINS}>
        {({loading, error, data, fetchMore}) => {
            if (loading || !data) return <div>Loading...</div>;
            return <div className="autocomplete-wrapper">
                <CoinSelector suggestions={data.getCoins.map(c => c.tokens)} {...props}/>
            </div>
        }
        }
    </Query>

};
CoinSelectorWrapper.propTypes = {
    defaultCoin: PropTypes.string,
    onClick: PropTypes.func
};
export default CoinSelectorWrapper;





