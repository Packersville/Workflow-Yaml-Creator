$(document).ready(function() {
  //Click event assigned to Add Field button and creates a delete button for that field
  $('#add_field_button').click(function(){
    $('div.module_field:last').after(createClone());
    $('div.module_field:last').find('input[name*="delete"]').click(function(){
      if ($('.module_field').size() != 1)
	$(this).closest('div.module_field').remove();
    });
  });
  
  //Add click event to initial delete button on the page
  $('input[name*="delete"]').click(function(){
    if ($('.module_field').size() != 1)
      $(this).closest('div.module_field').remove();
  });
  
  //Add click event to initial field type select
  $('.field_type_select').change(function(){
    if ($('.field_type_select').next().attr('name') == 'field_type'){
      $('.field_type_select').next().remove();
      appendFieldTypeSelectionInsideInput($('.field_type_select'))
    }
    else{
      appendFieldTypeSelectionInsideInput($('.field_type_select'));
    }
  });
  
  //Add value to acceptable values list and hidden field containing the value entered
  $('.field_acceptable_values > button').click(function(){
    var value = $(this).parent().find('input').val();
    if (value != ""){
      var li_count = $('.acceptable_value_list > ul > li').size()
      if (li_count != [])
	$('.acceptable_value_list > ul > li:last').after("<li>"+value+"<input class='hiddenInput' name='acceptable_value' type='text' value="+value+"/><input name='delete' type='image' src='images/icon_small_delete.gif'/></li>");
      else
	$('.acceptable_value_list').append("<ul><li>"+value+"<input class='hiddenInput' name='acceptable_value' type='text' value="+value+"/><input name='delete' type='image' src='images/icon_small_delete.gif'/></li></ul>");
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

//Appends a input after field_type_select that is hidden
function appendFieldTypeSelectionInsideInput($class){
  var newNumber = newNumber();
  $class.after("<input class='hiddenInput' name='field_type-'"+newNumber+"'type='text' value="+$class.val()+"/>");
}

function newNumber(){
  var number = (parseInt($('.field_name').last().find('input').attr('name').split('-')[1]) + 1);
  return number;
}

function createClone(){
  var newNumber = newNumber();
  var field_clone = '<div class="module_field">' +
    '<div class="field_name">Field Name: <input type="text" name="field_name-"'+newNumber+'"/></div>' +
    '<div class="field_type">Type: ' +
      '<select class="field_type_select">' +
	'<option value="integer">Integer</option>' +
	'<option value="string">String</option>' +
	'<option value="datetime">Datetime</option>' +
	'<option value="date">Date</option>' +
      '</select>' +
    '</div>' +
    '<div class="field_parent_module"> Parent Module (if one): <input type="text" name="parent_module-"'+newNumber+'"/></div>' +
    '<div class="acceptable_value_container">' +
      '<div class="field_acceptable_values">Acceptable Values<input type="text" name="acceptable_value_text_field"/><button id="add_button" type="button">Add Value</button></div>' +
      '<div class="acceptable_value_list"></div>' +
    '</div>' +
    '<div class="delete_field_button"><input type="image" name="delete_field" src="images/delete_circle.jpg"/></div>' +
   ' <hr>' +
  '</div>'
}



// $.ajax({
//   url: "bob"
//   typer: "POST",
//   contentType: "application/json; charset=utf-8",
//   data: json,
//   dataType: "json"  
// });