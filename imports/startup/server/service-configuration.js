Meteor.startup(() => {
    ServiceConfiguration.configurations.upsert(
        { service: 'google' },
        {
          $set: {
            clientId: Meteor.settings.private.google.clientID,
            loginStyle: 'redirect',
            secret: Meteor.settings.private.google.secret,
          }
        }
      );
});