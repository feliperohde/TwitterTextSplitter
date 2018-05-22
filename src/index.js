import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TwitterTextSplitter from './components/TwitterTextSplitter/TwitterTextSplitter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TwitterTextSplitter counterPattern="$current/$total " twitterCharsLimit={140} />, document.getElementById('root'));
registerServiceWorker();
