import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function postsPublication() {
    return Posts.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

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

    const post = Posts.findOne(postId);

    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.remove(postId);
  },

  'posts.setRead'(postId, setRead) {
    check(postId, String);
    check(setRead, Boolean);
    Posts.update(postId, { $set: { read: setRead } });
  },

  'posts.setPrivate'(postId, setToPrivate) {
    check(postId, String);
    check(setToPrivate, Boolean);

    const post = Posts.findOne(postId);
    // Make sure only the post owner can make a post private

    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.update(postId, { $set: { private: setToPrivate } });
  },
});