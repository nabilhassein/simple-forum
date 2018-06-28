import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './post.html';

Template.post.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.post.events({
  'click .toggle-read'() {
    Meteor.call('posts.setRead', this._id, !this.read);
  },
  'click .delete'() {
    Meteor.call('posts.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('posts.setPrivate', this._id, !this.private);
  },
});
