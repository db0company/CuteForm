/***************************************************************/
/* Author: db0 (db0company@gmail.com, http://db0.fr/)          */
/* Sources/Licence: https://github.com/db0company/CuteForm     */
/***************************************************************/

function cuteform(select, options) {
    var options = typeof options == 'undefined' ? [] : options;
    var cuteform = $('<div class="cuteform"></div>');
    select.addClass('cuteform-select');
    select.hide();
    select.after(cuteform);
    select.find('option').each(function() {
	var option = $(this);
	var image = typeof options[option.val()] == 'undefined' ? (typeof option.attr('data-cuteform-image') == 'undefined' ? option.val() : option.attr('data-cuteform-image')) : options[option.val()];
	image = $('<img src="' + image + '" data-cuteform-val="' + option.val() + '">');
	cuteform.append(image);
	if (option.val() == select.find('option:selected').first().val()) {
	    image.addClass('cuteform-selected');
	}
	image.click(function(e) {
	    select.val(image.attr('data-cuteform-val'));
	    cuteform.find('img').removeClass('cuteform-selected');
	    image.addClass('cuteform-selected');
	});
    });
}

function cuteformclear() {
    $('.cuteform').remove();
    $('.cuteform-selected').removeClass('cuteform-selected');
    $('.cuteform-select').show();
    $('.cuteform-select').removeClass('cuteform-select');
}

$(document).ready(function() {
    $('select[data-cuteform=true]').each(function() {
	cuteform($(this));
    });
});
