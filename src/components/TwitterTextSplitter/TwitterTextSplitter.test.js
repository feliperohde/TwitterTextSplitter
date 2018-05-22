import React from 'react';
import ReactDOM from 'react-dom';
import TwitterTextSplitter from './TwitterTextSplitter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TwitterTextSplitter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
