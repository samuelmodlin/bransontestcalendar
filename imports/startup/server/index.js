import './service-configuration.js';
import { Events } from '../../api/events.js';
import { Admins } from '../../api/admins.js';

Meteor.users.deny({ update: () => true });
Accounts.validateLoginAttempt((user) => {
    return true;
});
Accounts.onCreateUser((options, user) => {
    console.log(user.services.google.email);
    // if (Allowed.findOne({email: user.services.google.email}) == false){
    //     throw Meteor.Error(404, "No Permission!");
    // }
    let isAdminOnList = false;
    if (Admins.findOne({email: user.services.google.email})){
        isAdminOnList = true;
        console.log("Added Admin");
    }
    else {
        console.log("Not An Admin");
    }
    
    const customizedUser = user;
    if (options.profile) {
        customizedUser.profile = options.profile;
        customizedUser.profile.admin = isAdminOnList;
        customizedUser.profile.email = user.services.google.email;
        customizedUser.profile.department = 0;
    }
    return customizedUser;
});

Meteor.publish('events', function(){
    return Events.find();
});
