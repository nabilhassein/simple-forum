import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './post.html';

Template.post.events({
  'click .toggle-read'() {
    Meteor.call('posts.setRead', this._id, !this.read);
  },
  'click .delete'() {
    Meteor.call('posts.remove', this._id);
  },
});
