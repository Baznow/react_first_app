import React from "react";
import './DataBox.css'

export default class DataBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSmall: true,
        }
    }

    getJSON = (url) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            return xhr.responseText;
        }
    };

     handleRequest = () => {
        let url;
        if (this.state.isSmall) {
            url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        } else {
            url = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        }

        let jsonStrData = this.getJSON(url);
        this.props.callbackFromApp(jsonStrData);
    };

    handleRadio = () => {
        let isSmallPressed = this.state.isSmall;
        this.setState({
            isSmall: !isSmallPressed,
        });
    };

    render() {
        return (
            <section className={'section_pos'}>
                <div className={'load_data_box'}>
                    <label className={'header1'}>Выберите объём данных</label>
                    <section className={'btn_section'}>
                        <label className={'btn_radio'}>
                            <input type={'radio'} id={'rb1'} name={'rb_data'} onChange={this.handleRadio}/>
                            Маленький
                        </label>
                        <label className={'btn_radio'}>
                            <input type={'radio'} id={'rb2'} name={'rb_data'} onChange={this.handleRadio}/>
                            Большой
                        </label>
                    </section>
                    <input className={'btn_ok'} type={'submit'} value={'Submit'} onClick={this.handleRequest}/>
                </div>
            </section>
        )
    }
}