import { Mongo } from 'meteor/mongo';

export const Specials = new Mongo.Collection('specials');

// if (Specials.findOne({name: 'visits'}) == undefined){
//     Specials.insert({name: 'visits', days: []});
// }