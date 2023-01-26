import { ExportsCollection } from '../db/ExportsCollection';

const AVAILABLE_URLS = [
  "https://www.lempire.com/",
  "https://www.lemlist.com/",
  "https://www.lemverse.com/",
  "https://www.lemstash.com/"
]

Meteor.methods({
  'exports.insert'() {
    return ExportsCollection.insert({
      url: AVAILABLE_URLS[Math.floor(Math.random() * 4)],
      loadingProgression: 0
    });
  },
  'exports.updateProgressbar'(exportId, loadingProgression) {
    ExportsCollection.update(exportId, {
      $set: {
      loadingProgression: loadingProgression,
      },
    }); 
  },
  'exports.deleteAll'() {
    ExportsCollection.remove({});
  },
})