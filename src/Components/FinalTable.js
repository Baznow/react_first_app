import React from 'react'
import Search from './Search'
import Paginator from "./Paginator";
import './FinalTable.css'

export default class FinalTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rowsList: [],
            id: false,
            firstName: false,
            lastName: false,
            email: false,
            phone: false,

            curPage: 1,
            lastPage: 0,
            rowsPerPage: 50,
            startIndex: 0,
            endIndex: 50,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isTableShow) {
            const tableRows = props.data;
            const pageNum = Math.ceil(tableRows.length / state.rowsPerPage);
            return {
                rowsList: tableRows,
                lastPage: pageNum,
            };
        }
        return null;
    }

    handleSortId = () => {
        let rows = this.state.rowsList;
        const isIdPressed = this.state.id;
        rows.sort(function (a, b) {
            return isIdPressed ? b.id - a.id : a.id - b.id;
        });

        this.setState({
            rowsList: rows,
            id: !isIdPressed,
        })
    };

    handleSortFirstName = () => {
        let rows = this.state.rowsList;
        const isFirstNamePressed = this.state.firstName;
        rows.sort(function (a, b) {
            const x = a.firstName.toLowerCase();
            const y = b.firstName.toLowerCase();
            if (x > y) {return isFirstNamePressed ? -1 : 1;}
            if (x < y) {return isFirstNamePressed ? 1 : -1;}
            return 0;
        });

        this.setState({
            rowsList: rows,
            firstName: !isFirstNamePressed,
        })
    };

    handleSortLastName = () => {
        let rows = this.state.rowsList;
        const isLastNamePressed = this.state.lastName;
        rows.sort(function (a, b) {
            const x = a.lastName.toLowerCase();
            const y = b.lastName.toLowerCase();
            if (x > y) {return isLastNamePressed ? -1 : 1;}
            if (x < y) {return isLastNamePressed ? 1 : -1;}
            return 0;
        });

        this.setState({
            rowsList: rows,
            lastName: !isLastNamePressed,
        })
    };

    handleSortEmail = () => {
        let rows = this.state.rowsList;
        const isEmailPressed = this.state.email;
        rows.sort(function (a, b) {
            const x = a.email.toLowerCase();
            const y = b.email.toLowerCase();
            if (x > y) {return isEmailPressed ? -1 : 1;}
            if (x < y) {return isEmailPressed ? 1 : -1;}
            return 0;
        });

        this.setState({
            rowsList: rows,
            email: !isEmailPressed,
        })
    };

    handleSortPhone = () => {
        let rows = this.state.rowsList;
        const isPhonePressed = this.state.phone;
        rows.sort(function (a, b) {
            const x = a.phone.toLowerCase();
            const y = b.phone.toLowerCase();
            if (x > y) {return isPhonePressed ? -1 : 1;}
            if (x < y) {return isPhonePressed ? 1 : -1;}
            return 0;
        });

        this.setState({
            rowsList: rows,
            phone: !isPhonePressed,
        })
    };

    handleTableRowClick = (rowIndex) => {
        let row = this.state.rowsList[rowIndex];
        this.props.callbackFromApp(row);
    };

    handleSearchParams = (sData, isS) => {
        this.setState({
            isSearch: isS,
            searchData: sData,
        })
    };

    handlePaginatorParams = (nextPage) => {
        const sIndex = (nextPage - 1) * this.state.rowsPerPage;
        const eIndex = nextPage * this.state.rowsPerPage;
        this.setState({
            curPage: nextPage,
            startIndex: sIndex,
            endIndex: eIndex,
        })
    };

    render() {
        if (!this.props.isTableShow) {
            return (<table></table>);
        }
        let rows = [];
        let tableRows = this.state.rowsList;
        for (let i = this.state.startIndex; i < this.state.endIndex; i++) {
            let row = (
                <tr key={i} onClick={() => this.handleTableRowClick(i)}>
                    <td>{tableRows[i].id}</td>
                    <td>{tableRows[i].firstName}</td>
                    <td>{tableRows[i].lastName}</td>
                    <td>{tableRows[i].email}</td>
                    <td>{tableRows[i].phone}</td>
                </tr>
            );

            if (!this.state.isSearch) {
                rows.push(row);
            } else if (this.state.isSearch) {
                let str = tableRows[i].id + ' ' + tableRows[i].firstName + ' '
                    + tableRows[i].lastName + ' ' + tableRows[i].email + ' ' + tableRows[i].phone;
                if (str.search(this.state.searchData) !== -1) {
                    rows.push(row);
                }
            }
        }

        return (
            <section>
                <Search callbackSearchData={this.handleSearchParams}/>
                <table>
                    <tbody>
                        <tr className={'headerRow'}>
                            <th>
                                <input type={'checkbox'} name={'th'} id={'checkbox1'} onClick={this.handleSortId}/>
                                <label htmlFor={'checkbox1'}>id</label>
                            </th>
                            <th>
                                <input type={'checkbox'} name={'th'} id={'checkbox2'} onClick={this.handleSortFirstName}/>
                                <label htmlFor={'checkbox2'}>firstName</label>
                            </th>
                            <th>
                                <input type={'checkbox'} name={'th'} id={'checkbox3'} onClick={this.handleSortLastName}/>
                                <label htmlFor={'checkbox3'}>lastName</label>
                            </th>
                            <th>
                                <input type={'checkbox'} name={'th'} id={'checkbox4'} onClick={this.handleSortEmail}/>
                                <label htmlFor={'checkbox4'}>email</label>
                            </th>
                            <th>
                                <input type={'checkbox'} name='th' id={'checkbox5'} onClick={this.handleSortPhone}/>
                                <label htmlFor={'checkbox5'}>phone</label>
                            </th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
                <Paginator curPage = {this.state.curPage} lastPage = {this.state.lastPage} callbackTableParams = {this.handlePaginatorParams}/>
            </section>
        )
    }
}