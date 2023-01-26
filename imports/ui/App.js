import { Template } from 'meteor/templating';
import { ExportsCollection } from '../db/ExportsCollection';
import { ReactiveDict } from 'meteor/reactive-dict';

import './App.html';
import './Export.js';

const IS_LOADING_STRING = "isLoading";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
  
    const handler = Meteor.subscribe('exports');
    Tracker.autorun(() => {
      this.state.set(IS_LOADING_STRING, !handler.ready());
    });
});

Template.mainContainer.helpers({
    exports() {
        const instance = Template.instance();

        return ExportsCollection.find({}).fetch();
    },
    isLoading() {
        const instance = Template.instance();
        return instance.state.get(IS_LOADING_STRING);
    }
});

Template.mainContainer.events({
    'click #create-export-button'() {
        Meteor.call('exports.insert');
    },
});
