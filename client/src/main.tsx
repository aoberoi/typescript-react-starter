import React from 'react';  // tslint:disable-line:import-name
import ReactDOM from 'react-dom'; // tslint:disable-line:import-name

import Welcome from './components/welcome/Welcome';

const appElement = document.getElementById('app');
const csrfToken = (() => {
  const el = document.querySelector('meta[name=\'csrf-token\']');
  if (el !== null) {
    const content = el.getAttribute('content');
    return content !== null ? content : undefined;
  }
  return undefined;
})();

interface MainProps {
  csrfToken?: string;
}

// tslint:disable-next-line:variable-name
const Main = (_props: MainProps) => (
  <Welcome user={{ name: 'Bob' }} />
);

if (appElement !== null) {
  ReactDOM.render(
    <Main csrfToken={csrfToken} />,
    appElement,
  );
} else {
  console.error('Could not find element to mount app onto.');
}
