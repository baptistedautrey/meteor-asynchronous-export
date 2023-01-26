import { Meteor } from 'meteor/meteor';
import { ExportsCollection } from '/imports/db/ExportsCollection';
import '/imports/api/exportsMethods';
import '/imports/api/exportsPublications';

const insertExport = (url) =>
  ExportsCollection.insert({
    url: url, 
    loadingProgression: 0,
  });

Meteor.startup(() => {
  if (ExportsCollection.find().count() === 0) {
    [
      "https://www.lempire.com/",
      "https://www.lemlist.com/"
    ].forEach(exportUrl => insertExport(exportUrl));
  }
})
