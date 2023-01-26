import './Export.html';
import './Export.css';

Template.export.helpers({
    progressBarTitle: function() {
        if (this.loadingProgression === 100) {
            return "downloaded";
        } else {
            return "downloading";
        }
    },
    progressBarContent: function() {
        if (this.loadingProgression === 100) {
            return this.url;
        } else {
            return `${this.loadingProgression}%`;
        }
    }
});