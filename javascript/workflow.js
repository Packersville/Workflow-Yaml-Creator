var $module_clone = 0;
$(document).ready(function() {
  //Click event assigned to Add Field button and creates a delete button for that field
  //Assigns multiple events to elements as well
  addOnClickEvenToAddFieldButton($('.add_field_button'))
  
  //Add click event to initial delete button on the page
  createOnClickForDeleteButton()
  
  //Add click event to initial field type select (only to the initial, too)
  createHiddenFieldOnFieldTypeChange($('.field_type_select'))
  
  onSubmitAddHiddenFieldForAcceptableValues()
  
  //Add value to acceptable values list and hidden field containing the value entered
  addOnClickEventToAddValueButton($('.field_acceptable_values > button'))
  
  //Add onclick event to Add Module button
  addOnClickEventToAddModuleButton()
  
  $module_clone = $('.module').clone(true);
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
  var data = JSON.stringify(formData, null, '\t');
  document.getElementById('testArea').innerHTML = data;
  submitForm(data)
}

function addOnClickEventToAddModuleButton(){
  $('#add_module').click(function(){
    $('.module:last').after($module_clone);
    incrementModuleNumberForInputName()
    $module_clone = $('.module:last').clone(true);
  });
}

function incrementModuleNumberForInputName(){
  var name = buildInputCurrentName('module_name')
  $('.module:last').find('.module_name').attr('name', name);
  name = buildInputCurrentName('field_name')
  $('.module:last').find('.field_name > input').attr('name', name);
  name = buildInputCurrentName('parent_module')
  $('.module:last').find('.field_parent_module > input').attr('name', name);
}

function buildInputCurrentName(input){
  name = input+"-"+ $('.module').size() + "-" + $('.module:last > .module_field').size();
  return name;
}

function addOnClickEvenToAddFieldButton($button){
  $button.on("click",function(event){
    $(this).parents('.module').find('div.module_field:last').after(createClone($(this)));
    createOnClickForDeleteButton()
    createHiddenFieldOnFieldTypeChange($(this).parents('.module').find('.field_type_select'))
    addOnClickEventToAddValueButton($(this).parents('.module').find('.field_acceptable_values > button'))
  });
}

function addOnClickEventToAddValueButton($button){
  $button.click(function(){
    var value = $(this).parent().find('input').val();
    if (value != ""){
      var li_count = $(this).parent().parent().find('.acceptable_value_list > ul > li').size()
      if (li_count != [])
	$(this).parent().parent().find('.acceptable_value_list > ul > li:last').after("<li>"+value+"<input name='delete' type='image' src='images/icon_small_delete.gif'/></li>");
      else
	$(this).parent().parent().find('.acceptable_value_list').append("<ul><li>"+value+"<input name='delete' type='image' src='images/icon_small_delete.gif'/></li></ul>");
      $(this).parent().find('input').val("");
      $('input[name*="delete"]').click(function(){
	$(this).parent().remove()
      });
    }
  });
}

function onSubmitAddHiddenFieldForAcceptableValues(){
  $('#submit_button').click(function(){
    $('ul').each(function(){
      var moduleNumber = getModuleNumber($(this));
      var number = 1;
      field_name = $(this).parents('.module_field').find('.field_name input').attr('value'); //NOT FINDING FIELD NAME
      $(this).children('li').each(function(){
	removePreviousInput($(this))
	name_attribute_value = "'"+field_name+"-"+moduleNumber+"-"+number+"'";
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

function findNumber($element){
  var number = (parseInt($element.parents('.module_field').find($('.field_name')).find('input').attr('name').split('-')[2]));
  return number;
}

function createClone($this){
  var number = newNumber($this)
  var moduleNumber = getModuleNumber($this);
  var field_clone = '<div class="module_field">' +
    '<div class="field_name">Field Name: <input type="text" name="field_name-'+moduleNumber+'-'+number+'"/></div>' +
    '<div class="field_type">Type: ' +
      '<select class="field_type_select">' +
	'<option value="" selected="selected">Please Select</option>' +
	'<option value="integer">Integer</option>' +
	'<option value="string">String</option>' +
	'<option value="datetime">Datetime</option>' +
	'<option value="date">Date</option>' +
      '</select>' +
    '</div>' +
    '<div class="field_parent_module"> Parent Module (if one): <input type="text" name="parent_module-'+moduleNumber+'-'+number+'"/></div>' +
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
  $field_type_select.on("change", function(event){ 
  //$field_type_select.change(function(){
    if ($(this).next().attr('class') == 'hiddenInput'){
      $(this).next().remove();
      appendHiddenInputFieldContainingSelectedValue($(this))
    }
    else{
      appendHiddenInputFieldContainingSelectedValue($(this));
    }
  });
}

//Appends a input after field_type_select that is hidden
function appendHiddenInputFieldContainingSelectedValue($select){
  var number = findNumber($select)
  var moduleNumber = getModuleNumber($select)
  $select.after("<input class='hiddenInput' name='field_type-"+moduleNumber+"-"+number+"'type='text' value="+$select.val()+" />")
}

function createOnClickForDeleteButton($module_field){
  $('div.module_field').find('input[name*="delete"]').click(function(){
    if ($('.module_field').size() != 1)
      $(this).closest('div.module_field').remove();
  });
}

function getModuleNumber($this){
  var moduleNumber = (parseInt($this.parents('.module').find('.module_name').attr('name').split('-')[1]));
  return moduleNumber;
}

function newNumber($this){
  var number = (parseInt($this.parents('.module').find('.field_name').last().find('input').attr('name').split('-')[2]) + 1);
  return number;
}

function submitForm(data){
  $.ajax({
    type:"POST",
    dataType:"json",
    data: data
    error:function(xhr, textStatus, errorThrown){
      alert("Error: " + textStatus);
    }
  });
}
