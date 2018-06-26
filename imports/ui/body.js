import { Template } from 'meteor/templating';
import { Posts } from '../api/posts.js';
import './body.html';

Template.body.helpers({
    posts() {
        return Posts.find({});
    },
});

Template.body.events({
  'submit .new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Posts.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';
  },
});