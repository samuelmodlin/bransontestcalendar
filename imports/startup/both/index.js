import './accounts.js';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events.js';
import { Admins } from '../../api/admins.js';
import { Specials } from '../../api/specials.js';

import Settings from '../../../departments.json'

Meteor.methods({
    'addEvent'({ name, classTitle, department, date, type, blocks, grades, created, googleId }) {
        if (Meteor.userId !== null) {
            if (Meteor.userId() == googleId || Meteor.user().profile.admin){
                Events.insert(
                    {
                        name: name,
                        start: date,
                        classTitle: classTitle,
                        department: department,
                        type: type,
                        blocks: blocks,
                        grades: grades,
                        created: created,
                        googleId: googleId,
                    }
                );
            }
        }
    },
    'removeEvent'({ id, googleId }) {
        if (Meteor.userId() !== null) {
            if (Meteor.userId() == googleId || Meteor.user().profile.admin){
                Events.remove({_id: id});
            }
        }
    },
    'changeDepartment'({ department }) {
        if (Meteor.userId() !== null) {
            Meteor.users.update({ _id: Meteor.userId()},
                { $set: { 'profile.department': department }});
        }
    },
    'addInvite'({ email }) {
        if (Meteor.userId() !== null) {
            if (Meteor.user().profile.admin) {
                Invite.insert({email: email});
            }
        }
    }
});