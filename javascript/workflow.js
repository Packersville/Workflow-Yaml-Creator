$(document).ready(function() {
  //Click event assigned to Add Field button and creates a delete button for that field
  //Assigns multiple events to elements as well
  $('#add_field_button').click(function(){
    $('div.module_field:last').after(createClone());
    createOnClickForDeleteButton()
    createHiddenFieldOnFieldTypeChange($('.field_type_select:last'))
  });
  
  //Add click event to initial delete button on the page
  createOnClickForDeleteButton()
  
  //Add click event to initial field type select (only to the initial, too)
  createHiddenFieldOnFieldTypeChange($('.field_type_select'))
  
  addHiddenFieldForAcceptableValues()
  
  //Add value to acceptable values list and hidden field containing the value entered
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

function formSubmit(){
  var formData = form2js('testForm', '.', true,
    function(node)
    {
      if (node.id && node.id.match(/callbackTest/))
      {
	return { name: node.id, value: node.innerHTML };
      }
    });
  document.getElementById('testArea').innerHTML = JSON.stringify(formData, null, '\t');
}

function addHiddenFieldForAcceptableValues(){
  $('#submit_button').click(function(){
    $('ul').each(function(){
      var number = 1;
      field_name = $(this).parents('.module_field').find('.field_name input').attr('value'); //NOT FINDING FIELD NAME
      $(this).children('li').each(function(){
	removePreviousInput($(this))
	name_attribute_value = "'"+field_name+"-"+number+"'";
	inner_html = $(this).html();
	value = inner_html.substring(0, inner_html.indexOf('<'));
	$(this).after("<input class='hiddenInput' name="+name_attribute_value+"'type='text' value="+value+" />");
	number ++;
      });
    });
  });
}

function removePreviousInput($li){
  if($li.next().is("input"))
    $li.next().remove();
}

//Appends a input after field_type_select that is hidden
function appendHiddenInputFieldContainingSelectedValue($class){
  var number = findNumber($class)
  $class.after("<input class='hiddenInput' name='field_type-"+number+"'type='text' value="+$class.val()+" />")
}

function findNumber($element){
  var number = (parseInt($element.parents('.module_field').find($('.field_name')).find('input').attr('name').split('-')[1]));
  return number;
}

function newNumber(){
  var number = (parseInt($('.field_name').last().find('input').attr('name').split('-')[1]) + 1);
  return number;
}

function createClone(){
  var number = newNumber()
  var field_clone = '<div class="module_field">' +
    '<div class="field_name">Field Name: <input type="text" name="field_name-'+number+'"/></div>' +
    '<div class="field_type">Type: ' +
      '<select class="field_type_select">' +
	'<option value="" selected="selected">Please Select</option>' +
	'<option value="integer">Integer</option>' +
	'<option value="string">String</option>' +
	'<option value="datetime">Datetime</option>' +
	'<option value="date">Date</option>' +
      '</select>' +
    '</div>' +
    '<div class="field_parent_module"> Parent Module (if one): <input type="text" name="parent_module-'+number+'"/></div>' +
    '<div class="acceptable_value_container">' +
      '<div class="field_acceptable_values">Acceptable Values<input type="text" name="acceptable_value_text_field"/><button id="add_button" type="button">Add Value</button></div>' +
      '<div class="acceptable_value_list"></div>' +
    '</div>' +
    '<div class="delete_field_button"><input type="image" name="delete_field" src="images/delete_circle.jpg"/></div>' +
   ' <hr>' +
  '</div>'
  return field_clone
}

function createHiddenFieldOnFieldTypeChange($field_type_select){
  $field_type_select.change(function(){
    if ($(this).next().attr('class') == 'hiddenInput'){
      $(this).next().remove();
      appendHiddenInputFieldContainingSelectedValue($field_type_select)
    }
    else{
      appendHiddenInputFieldContainingSelectedValue($field_type_select);
    }
  });
}

function createOnClickForDeleteButton($module_field){
  $('div.module_field').find('input[name*="delete"]').click(function(){
    if ($('.module_field').size() != 1)
      $(this).closest('div.module_field').remove();
  });
}
