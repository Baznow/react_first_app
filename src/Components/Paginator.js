import React from 'react'
import './Paginator.css'

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagStartIndex: 0,
            pagsInRow: 3,
            isPagLeftArrow: false,
            isPagRightArrow: true,
        }
    }

    handlePageLeftArrow = () => {
        let nextPage = this.props.curPage - 1;
        if (nextPage >= 0) {
            this.paginatorClick(nextPage);
            if (nextPage === this.state.pagStartIndex) {
                this.setState({
                    pagStartIndex: nextPage - this.state.pagsInRow,
                })
            }
        }
    };

    handlePageRightArrow = () => {
        let nextPage = this.props.curPage + 1;
        if (nextPage <= this.props.lastPage) {
            this.paginatorClick(nextPage);
            if (nextPage - 1 === this.state.pagStartIndex + this.state.pagsInRow) {
                this.setState({
                    pagStartIndex: nextPage - 1,
                })
            }
        }
    };

    handlePageNumClick = (newPageNum) => {
        this.paginatorClick(newPageNum);

        if (newPageNum === this.props.lastPage) {
            let pagSIndex = this.props.lastPage - this.state.pagsInRow;
            if (this.props.lastPage % this.state.pagsInRow !== 0) {
                pagSIndex += 1;
            }

            this.setState({
                pagStartIndex: pagSIndex,
            })
        }
    };

    paginatorClick = (nextPage) => {
        if (nextPage > this.props.lastPage) {
            return;
        }

        const isPagLeftAr = nextPage > 1;
        const isPagRightAr = nextPage < this.props.lastPage;
        this.setState({
            isPagLeftArrow: isPagLeftAr,
            isPagRightArrow: isPagRightAr,
        });

        this.props.callbackTableParams(nextPage);
    };

    render() {
        let pagsToDisplay = [];
        for (let i = this.state.pagStartIndex; i < this.state.pagStartIndex + this.state.pagsInRow; i++) {
            pagsToDisplay.push(
                <div
                    className={'paginator ' + (this.props.curPage === i + 1 && i + 1 < this.props.lastPage ? 'pag_selected' : null)}
                    key={i}
                    onClick={() => this.handlePageNumClick(i + 1)}>
                    {i + 1 < this.props.lastPage ? i + 1 : '...'}
                </div>
            );
        }
        return (
            <section className={'paginator_container'}>
                <div className={'paginator left_arrow ' + (this.state.isPagLeftArrow ? null : 'disable_button')}
                     onClick={this.handlePageLeftArrow}></div>
                {pagsToDisplay}
                <div className={'paginator three_dots'}>...</div>
                <div
                    className={'paginator ' + (this.props.curPage === this.props.lastPage ? 'pag_selected' : null)}
                    onClick={() => this.handlePageNumClick(this.props.lastPage)}>
                    {this.props.lastPage}
                </div>
                <div className={'paginator right_arrow ' + (this.state.isPagRightArrow ? null : 'disable_button')}
                     onClick={this.handlePageRightArrow}></div>
            </section>
        )
    }
};