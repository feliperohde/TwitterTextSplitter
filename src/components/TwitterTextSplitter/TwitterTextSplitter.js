import React, { Component } from 'react';
import TwitterList from './TwitterList'
import './TwitterTextSplitter.css';

class TwitterTextSplitter extends Component {

  constructor(props) {
    super(props)

    this.defaultProps = {
      twitterCharsLimit: 42,
      counterPattern: "($current/$total) "
    }

    this.state = {
      fullString: "",
      realTweetsWithCount: 0,
      twittsList: []
    }

    this.arms = {...this.defaultProps, ...props}
  }

  createTwitts() {

    let twittsList = []
    let lastEnd = 0

    for (let idx = 0; idx < this.state.realTweetsWithCount; idx++) {

      let counter = this.createCounter(idx, this.state.realTweetsWithCount)

      let
      start = (idx * this.arms.twitterCharsLimit)
      start = (idx === 0) ? start : lastEnd

      let
      end = (this.arms.twitterCharsLimit - counter.length) + (this.arms.twitterCharsLimit * idx)
      end = (idx === 0) ? end : lastEnd + this.arms.twitterCharsLimit - counter.length

      let currText = this.state.fullString.replace(/(\r\n|\n|\r)/gm," ").slice(start, end)

      twittsList.push({
        id: idx,
        value: counter + currText
      })

      lastEnd = end

    }

    this.setState({twittsList: twittsList})

  }

  createCounter(idx, total) {
    return this.arms.counterPattern
      .replace("$current", idx + 1)
      .replace("$total", total)
  }

  measureTweets(text) {

    let re = new RegExp(".{1," + this.arms.twitterCharsLimit + "}", 'g')
    let itensWithoutCounter = text.replace(/(\r\n|\n|\r)/gm," ").match(re)
    let stringSum = ""

    if(!itensWithoutCounter) return []

    itensWithoutCounter.map(function(item, idx) {
      stringSum = stringSum + this.createCounter(idx, itensWithoutCounter.length).toString()
    }.bind(this))

    let charsNeeded = (stringSum + this.state.fullString).replace(/(\r\n|\n|\r)/gm," ")

    return (charsNeeded.match(re).length > itensWithoutCounter.length) ? this.measureTweets(charsNeeded) : charsNeeded.match(re)

  }

  prepare(callback) {

    this.setState({realTweetsWithCount: this.measureTweets(this.state.fullString).length }, function() {
      callback();
    })

  }

  textHandler(event) {
    this.setState({fullString: event.target.value}, function() {
      this.prepare(function(){
        this.createTwitts()
      }.bind(this));
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Twitter Text Splitter</h1>
          <p className="App-intro">Cole um texto para dividir em tweets :)</p>
        </header>

        <section className="App-body">
          <textarea onChange={this.textHandler.bind(this)} type="text" className="App-textInput" defaultValue="Cole ou digite seu tweet aqui :)" />

          <TwitterList twittsList={this.state.twittsList} />

        </section>
      </div>
    );
  }
}

export default TwitterTextSplitter;
