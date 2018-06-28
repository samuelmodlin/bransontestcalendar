Meteor.startup(() => {
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