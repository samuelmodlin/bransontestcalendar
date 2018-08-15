import './accounts.js';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events.js';
import Settings from '../../../departments.json'

Meteor.methods({
    'addEvent'({ name, className, department, date, type, blocks, grades, created, googleId }) {
        if (Meteor.userId !== null) {
            Events.insert(
                {
                    name: name,
                    start: date,
                    className: className,
                    department: department,
                    type: type,
                    blocks: blocks,
                    grades: grades,
                    created: created,
                    googleId: googleId,
                }
            );
        }
    },
    'removeEvent'({ id }) {
        if (Meteor.userId !== null) {
            Events.remove({_id: id});
        }
    }
});