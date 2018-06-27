import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
  'posts.insert'(text) {
    check(text, String);
    // Make sure the user is logged in before inserting a post
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },

  'posts.remove'(postId) {
    check(postId, String);
    Posts.remove(postId);
  },

  'posts.setRead'(postId, setRead) {
    check(postId, String);
    check(setRead, Boolean);
    Posts.update(postId, { $set: { read: setRead } });
  },

});