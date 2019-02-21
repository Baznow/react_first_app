import React from 'react'
import './Search.css'

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: true,
            searchData: null,
        }
    }

    handleSearchInput = (event) => {
        if (event.target.value === "") {
            this.props.callbackSearchData(this.state.searchData, !this.state.isSearch);
        }

        this.setState({
            searchData: event.target.value,
        });
    };


    handleSearchButton = () => {
        this.props.callbackSearchData(this.state.searchData, this.state.isSearch);
    };

    render() {
        return (
            <section className={'search_section'}>
                <input type={'search'} onChange={this.handleSearchInput}/>
                <button onClick={this.handleSearchButton}>Search</button>
            </section>
        )
    }
}

