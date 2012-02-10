$(document).ready(function() {
  $('#add_field_button').click(function(){
    $('div.module_field:last').after(field_clone);
    field_clone.find('input[name*="delete"]').click(function(){
      if ($('.module_field').size() != 1)
	$(this).closest('div.module_field').remove();
    });
  });
  $('input[name*="delete"]').click(function(){
    if ($('.module_field').size() != 1)
      $(this).closest('div.module_field').remove();
  });
  
  $('.field_acceptable_values > button').click(function(){
    var value = $(this).parent().find('input').val();
    if (value != ""){
      var li_count = $('.acceptable_value_list > ul > li').size()
      if (li_count != [])
	$('.acceptable_value_list > ul > li:last').after("<li>"+value+"<input name='delete' type='image' src='images/icon_small_delete.gif'/></li>");
      else
	$('.acceptable_value_list').append("<ul><li>"+value+"<input name='delete' type='image' src='images/icon_small_delete.gif'/></li></ul>");
      $(this).parent().find('input').val("");
      $('input[name*="delete"]').click(function(){
	$(this).parent().remove()
      });
    }
  });
});

var field_clone = '<div class="module_field">' +
    '<div class="field_name">Field Name: <input type="text" name="field_name" /></div>' +
    '<div class="field_type">Type: ' +
      '<select>' +
	'<option value="integer">Integer</option>' +
	'<option value="string">String</option>' +
	'<option value="datetime">Datetime</option>' +
	'<option value="date">Date</option>' +
      '</select>' +
    '</div>' +
    '<div class="field_parent_module">Parent Module (if one): <input type="text" name="parent_module"/></div>' +
    '<div class="acceptable_value_container">' +
      '<div class="field_acceptable_values">Acceptable Values<input type="text" name="acceptable_value_text_field"/><button id="add_button" type="button">Add Value</button></div>' +
      '<div class="acceptable_value_list"></div>' +
    '</div>' +
    '<div class="delete_field_button"><input type="image" name="delete_field" src="images/delete_circle.jpg"/></div>' +
   ' <hr>' +
  '</div>'