import { Mongo } from 'meteor/mongo';

export const Admins = new Mongo.Collection('admins');

Admins.insert({email: "Rich_Parsons@branson.org"});
Admins.insert({email: "samuel_modlin@branson.org"});