import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Posts } from '../api/posts.js';

import './post.js';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  posts() {
    const instance = Template.instance();
    const filters = instance.state.get('hideRead') ? { read: { $ne: true } } : {};
    return Posts.find(filters);
  },
  unreadCount() {
    return Posts.find({ read: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-post'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Posts.insert({
      text: text,
      createdAt: new Date(),
    });

    target.text.value = '';
  },
  'change .hide-read input'(event, instance) {
    instance.state.set('hideRead', event.target.checked);
  },
});

