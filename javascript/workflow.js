var $field_clone = 0
$(document).ready(function() {
  $field_clone = $('.cloneable_module_field').clone();
  $field_clone = $field_clone.removeAttr("class").attr("class", "module_field");
  $('#add_field_button').click(function(){
    $('div.module_field').after($field_clone);
    $field_clone.find('input[name*="delete"]').click(function(){
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