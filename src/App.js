import React from "react";
import DataBox from './Components/DataBox'
import FinalTable from './Components/FinalTable'
import './AppStyle.css'

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isBtnFormat: true,
            tableURL: null,
            isRenderTable: false,
            lastRowData: null,
        }
    }

    loadDataBox = () => {
        const isBtnFormatPressed = this.state.isBtnFormat;
        this.setState({
            isBtnFormat: !isBtnFormatPressed,
        });
        return <DataBox />
    };

    callbackTableData = (jsonStrData) => {
        const jsonData = JSON.parse(jsonStrData);
        const isBtnFormatPressed = this.state.isBtnFormat;

        this.setState({
            isBtnFormat: !isBtnFormatPressed,
            lastRowData: null,
            searchData: null,
            tableData: jsonData,
            isRenderTable: true,
        });
    };

    callbackRowData = (tableRow) => {
        let dataToDisplay = (
            <fieldset className={"row_info"}>
                <legend>Подробная информация</legend>
                Выбран пользователь
                <b>
                    {" " + tableRow.firstName + " " + tableRow.lastName}
                </b><br/>
                Описание:<br/>
                <textarea rows={6} cols={30}>
                    {tableRow.description}
                </textarea><br/>
                Адрес проживания:
                <b>
                    {" " + tableRow.address["streetAddress"]}
                </b><br/>
                Город:
                <b>
                    {" " + tableRow.address["city"]}
                </b><br/>
                Провинция/штат:
                <b>
                    {" " + tableRow.address["state"]}
                </b><br/>
                Индекс:
                <b>
                    {" " + tableRow.address["zip"]}
                </b>
            </fieldset>
        );
        this.setState({
            lastRowData: dataToDisplay,
        })
    };

    render() {
        return(
            <section className={'app_section'}>
                <aside className={'side_section'}>
                    {this.state.lastRowData}
                </aside>
                <main className={'main_section'}>
                    {this.state.isRenderTable
                        ? <FinalTable data={this.state.tableData} isTableShow={true} searchData={this.state.searchData} isSearch={this.state.isSearch} callbackSearchLock={this.handleSearchButton} callbackFromApp={this.callbackRowData}/>
                        : null}
                </main>
                <aside className={'side_section'}>
                    <button className={'btn_format'} onClick={this.loadDataBox}>Data format</button>
                    {this.state.isBtnFormat
                        ? <DataBox callbackFromApp={this.callbackTableData}/>
                        : null}
                </aside>
            </section>
        )
    }
}