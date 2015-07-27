import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('band').get('songs');
  },

  actions: {
    createSong: function() {
      var controller = this.get('controller');
      var band = this.modelFor('band');

      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });
      song.save().then(function(){
        controller.set('title','');
        controller.set('songCreationStarted',false);
      });
    },
    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;

          song.set('rating',rating);
          song.save();
    },
    didTransition: function() {
      var band = this.modelFor('band');
      Ember.$(document).attr('title', '%@ songs - Rock & Roll'.fmt(band.get('name')));
    }
  }
});
