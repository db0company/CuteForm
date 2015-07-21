/***************************************************************/
/* Author: db0 (db0company@gmail.com, http://db0.fr/)          */
/* Sources/Licence: https://github.com/db0company/CuteForm     */
/***************************************************************/

function cuteformimage(image, value, options) {
    return $('<img src="' + image + '" data-cuteform-val="' + value + '">');
}

function cuteform(select, options) {
    var options = typeof options == 'undefined' ? {} : options;
    select.addClass('cuteform-select');
    var cuteform, modal, modal_button;
    // Modal
    var with_modal = options['modal'] == 'true' || select.attr('data-cuteform-modal') == 'true';
    if (with_modal) {
	modal = $('<div class="cuteform modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"></div></div></div></div>');
	cuteform = modal.find('.modal-body');
	$('body').append(modal);
	var modal_button = $('<button class="cuteform-modal-button"></button>');
	select.after(modal_button);
	select.hide();
    } else {
	var hide = !((typeof options['hide'] !== 'undefined' && options['hide'].toString() == 'false') || select.attr('data-cuteform-hide') == 'false');
	if (hide) {
	    select.hide();
	}
	cuteform = $('<div class="cuteform">' + (hide ? '' : '<br>') + '</div>');
	select.after(cuteform);
    }
    // Show images on cuteform div
    select.find('option').each(function() {
	var option = $(this);
	var image = typeof options['images'] !== 'undefined' && typeof options['images'][option.val()] !== 'undefined' ? options['images'][option.val()] : (typeof option.attr('data-cuteform-image') == 'undefined' ? option.val() : option.attr('data-cuteform-image'));
	image = cuteformimage(image, option.val(), options);
	cuteform.append(image);
	if (option.val() == select.find('option:selected').first().val()) {
	    image.addClass('cuteform-selected');
	}
	// On click, change current selected option and change images style
	image.click(function(e) {
	    select.val(image.attr('data-cuteform-val'));
	    cuteform.find('img').removeClass('cuteform-selected');
	    image.addClass('cuteform-selected');
	    if (with_modal) {
		modal_button.text('');
		modal_button.append(cuteform.find('.cuteform-selected').clone(true).off());
		modal.modal('hide');
	    }
	});
    });
    if (with_modal) {
	// Change the content of the modal button and bind click
	modal_button.append(cuteform.find('.cuteform-selected').clone(true).off());
	modal_button.click(function(e) {
	    e.preventDefault();
	    modal.css('display', 'block');
	    modal.modal();
	    modal.on('hidden.bs.modal', function (e) {
		modal.css('display', 'none');
	    });
	});
    }
    // Change the selected images when the original select box changes
    select.change(function() {
	cuteform.find('img').removeClass('cuteform-selected');
	cuteform.find('[data-cuteform-val=' + select.find('option:selected').first().val() + ']').addClass('cuteform-selected');
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
