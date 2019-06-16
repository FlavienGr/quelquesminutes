/* eslint-disable no-undef */
const $ = jQuery.noConflict();
$(document).ready(() => {
  $('.datepicker').datepicker({
    startDate: '-3d'
  });
});
