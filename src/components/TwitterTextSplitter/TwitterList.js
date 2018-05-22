import React, { Component } from 'react';

class TwitterList extends Component {

    constructor(props) {
        super(props)

        this.getProps(props)
    }

    getProps(props) {
        this.list = {...[], ...props}
    }

    componentWillReceiveProps(props) {
        this.getProps(props)
    }

    buttonHandler(event) {
        event.preventDefault();
        window.scrollTo(0,0);
    }

    tapHandler(event) {
        let copyText = event.target

        copyText.select()
        document.execCommand("copy")
        copyText.parentElement.classList.add("is-copied")

        setTimeout(function() {
            copyText.parentElement.classList.remove("is-copied")
        }, 1500)
    }

    render() {
        return (
            <ul className="App-twitterList">
                {this.list.twittsList.map(item => (

                <li key={item.id} className="App-twitterItem">
                    <textarea onClick={this.tapHandler.bind(this)} type="text" readOnly className="App-textInput" value={item.value} />
                </li>

                ))}
                <li className="App-twitterItem">
                    <button className="App-twitterButton" onClick={this.buttonHandler.bind(this)}>...precisa de mais tweets?</button>
                </li>
            </ul>
        );
    }
}

export default TwitterList;