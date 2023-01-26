import { Template } from 'meteor/templating';
import { ExportsCollection } from '../db/ExportsCollection';
import { ReactiveDict } from 'meteor/reactive-dict';

import './App.html';
import './Export.js';

const IS_LOADING_STRING = "isLoading";


const loadProgressionBar = (exportId) => {
    const currentExport = ExportsCollection.findOne({ _id: exportId});

    let intervalId = Meteor.setInterval(() => {
      if (currentExport.loadingProgression < 100) {
        currentExport.loadingProgression += 5;
        Meteor.call('exports.updateProgressbar', exportId, currentExport.loadingProgression);
      } else {
        Meteor.clearInterval(intervalId);
      }
    }, 1000);
}

Template.mainContainer.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict();
  
    const handler = Meteor.subscribe('exports');
    Tracker.autorun(() => {
      this.state.set(IS_LOADING_STRING, !handler.ready());
    });
});

Template.mainContainer.helpers({
    exports() {
        return ExportsCollection.find({}).fetch();
    },
    isLoading() {
        const instance = Template.instance();
        return instance.state.get(IS_LOADING_STRING);
    }
});

Template.mainContainer.events({
    'click #create-export-button'() {
        Meteor.call('exports.insert', this._id, function(error, result){
            var exportId = result;
            console.log(exportId);
            loadProgressionBar(exportId);
        });
    },
});
