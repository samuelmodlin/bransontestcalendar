import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Accounts.config({ restrictCreationByEmailDomain: 'branson.org' });
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        clientId: Meteor.settings.private.google.clientID,
        loginStyle: 'popup',
        secret: Meteor.settings.private.google.secret,
      }
    }
  );
});
