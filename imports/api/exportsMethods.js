import { check } from 'meteor/check';
import { ExportsCollection } from '../db/ExportsCollection';

const AVAILABLE_URLS = [
  "https://www.lempire.com/",
  "https://www.lemlist.com/",
  "https://www.lemverse.com/",
  "https://www.lemstash.com/"
]

Meteor.methods({
  'exports.insert'() {
    ExportsCollection.insert({
      url: AVAILABLE_URLS[Math.floor(Math.random() * 4)],
      loadingProgression: 0
    });
  },
})