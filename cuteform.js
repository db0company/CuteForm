/***************************************************************/
/* Author: db0 (db0company@gmail.com, http://db0.fr/)          */
/* Sources/Licence: https://github.com/db0company/CuteForm     */
/***************************************************************/

function cuteformhtml(option, options) {
    var value = option.val();
    var text = option.text();
    var image = typeof options['images'] !== 'undefined' && typeof options['images'][value] !== 'undefined' ? options['images'][value] : (typeof option.attr('data-cuteform-image') !== 'undefined' ? option.attr('data-cuteform-image') : null);
    if (image !== null) {
	return $('<img class="cuteform-elt" src="' + image + '" data-cuteform-val="' + value + '" data-cuteform-text="' + text + '">');
    }
    var html = typeof options['html'] !== 'undefined' && typeof options['html'][value] !== 'undefined' ? options['html'][value] : (typeof option.attr('data-cuteform-html') !== 'undefined' ? option.attr('data-cuteform-html') : value);
    return $('<div class="cuteform-elt" data-cuteform-val="' + value + '" data-cuteform-text="' + text + '">' + html + '</div>');
}

function cuteform(select, options) {
    var options = typeof options == 'undefined' ? {} : options;
    select.addClass('cuteform-select');
    var cuteform, modal, modal_button;
    // Modal
    var with_modal = options['modal'] == 'true' || select.attr('data-cuteform-modal') == 'true';
    var with_modal_text = options['modal-text'] == 'true' || select.attr('data-cuteform-modal-text') == 'true';
    cuteform = $('<div class="cuteform">' + (hide || with_modal ? '' : '<br>') + '</div>');
    select.after(cuteform);
    if (with_modal) {
	modal = $('#cuteform-modal');
	var modal_button = $('<button class="cuteform-modal-button"></button>');
	select.after(modal_button);
	select.hide();
	cuteform.hide();
    } else {
	var hide = !((typeof options['hide'] !== 'undefined' && options['hide'].toString() == 'false') || select.attr('data-cuteform-hide') == 'false');
	if (hide) {
	    select.hide();
	}
    }
    // Show images on cuteform div
    select.find('option').each(function() {
	var option = $(this);
	var html = cuteformhtml(option, options);
	cuteform.append(html);
	if (option.val() == select.find('option:selected').first().val()) {
	    html.addClass('cuteform-selected');
	}
	// On click, change current selected option and change images style
	html.click(function(e) {
	    select.val(html.attr('data-cuteform-val'));
	    cuteform.find('.cuteform-elt').removeClass('cuteform-selected');
	    html.addClass('cuteform-selected');
	    if (with_modal) {
		modal_button.text('');
		if (with_modal_text) {
		    modal_button.append('<span class="cuteform-modal-text">' + cuteform.find('.cuteform-selected').attr('data-cuteform-text') + '</span>');
		} else {
		    modal_button.append(cuteform.find('.cuteform-selected').clone(true).off());
		}
		modal.modal('hide');
	    }
	});
    });
    if (with_modal) {
	// Change the content of the modal button and bind click
	if (with_modal_text) {
	    modal_button.append('<span class="cuteform-modal-text">' + cuteform.find('.cuteform-selected').attr('data-cuteform-text') + '</span>');
	} else {
	    modal_button.append(cuteform.find('.cuteform-selected').clone(true).off());
	}
	modal_button.click(function(e) {
	    e.preventDefault();
	    modal.css('display', 'block');
	    modal.find('.modal-body').text('');
	    var clone = cuteform.clone(true);
	    clone.show();
	    modal.find('.modal-body').append(clone);
	    modal.modal();
	    modal.on('hidden.bs.modal', function (e) {
		modal.css('display', 'none');
	    });
	});
    }
    // Change the selected images when the original select box changes
    select.change(function() {
	cuteform.find('.cuteform-elt').removeClass('cuteform-selected');
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
