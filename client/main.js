import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  Accounts.config({ restrictCreationByEmailDomain: 'branson.org' });
  render(<App />, document.getElementById('render-target'));
});