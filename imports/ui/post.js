import { Template } from 'meteor/templating';
import { Posts } from '../api/posts.js';
import './post.html';

Template.post.events({
  'click .toggle-read'() {
    // Set the read property to the opposite of its current value
    Posts.update(this._id, {
      $set: { read: !this.read },
    });
  },
  'click .delete'() {
    Posts.remove(this._id);
  },
});
