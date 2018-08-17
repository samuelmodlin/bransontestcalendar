import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';
import '../imports/startup/both';
import '../imports/startup/client';


Meteor.startup(() => {
  Tracker.autorun(() => {
    if (Accounts.loginServicesConfigured()) {
      render(<App />, document.getElementById('render-target'));
    }
  });
});