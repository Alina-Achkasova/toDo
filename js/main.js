$(document).ready(function(){

	var itemsInput = getFromLocal('inputs');
	var itemsCompleted = JSON.parse(localStorage.getItem("itemsCompleted"));
	var result = JSON.parse(localStorage.getItem("object"));
	var index;
	loadList(itemsInput);
	loadList(itemsCompleted);
	loadList(result[itemsInput[index]]);

	$('#main-button').prop('disabled', true);
	$('#main-input').keyup(function(){
		if($(this).val().length !== 0) {
			$('#main-button').prop('disabled', false);
		} else {
			$('#main-button').prop('disabled', true);
		}
	});

	$('#main-input').keypress(function(e){
		if(e.which === 13) {
			if ($('#main-input').val().length !== 0)
				$('#main-button').click();
		}
	});

	// add an item
	$('#main-button').click(function(){
		var valueInput = $('#main-input').val();
		var valueText = $('#main-textarea').val();
		itemsInput.push(valueInput);
	    itemsInput.sort();
	    itemsInput.reverse();
	    result[valueInput] = valueText;
	    itemsCompleted[valueInput] = 0;

		$('#main-input').val('');
		$('#main-textarea').val('');
		loadList(itemsInput);
		loadList(result[itemsInput[index]]);
		loadList(itemsCompleted[itemsInput[index]]);
		storeToLocalInput('inputs', itemsInput);
		localStorage.setItem('object', JSON.stringify(result));
		localStorage.setItem('itemsCompleted', JSON.stringify(itemsCompleted));
		$('#main-button').prop('disabled', true);
	});

	// delete an item
	$('ul').delegate(".glyphicon-remove", "click", function(event){
		event.stopPropagation();
		index = $('.glyphicon-remove').index(this);
		$('li').eq(index).remove();
		delete result[itemsInput[index]];
		delete itemsCompleted[itemsInput[index]];
		itemsInput.splice(index, 1);
		storeToLocalInput('inputs', itemsInput);
		localStorage.setItem('object', JSON.stringify(result));
		localStorage.setItem('itemsCompleted', JSON.stringify(itemsCompleted));
		
	});

	// edit panel
	$('ul').delegate('.glyphicon-edit', 'click', function(){
		index = $('.glyphicon-edit').index(this);
		var contentInput = itemsInput[index];
		$('#edit-input').val(contentInput);
		$('#edit-textarea').val(result[itemsInput[index]]);
	});

	$('#edit-button').click(function(){
		itemsInput[index] = $('#edit-input').val();
		result[itemsInput[index]] = $('#edit-textarea').val();
		itemsCompleted[itemsInput[index]] = 0;
		loadList(itemsInput);
		loadList(result[itemsInput[index]]);
		loadList(itemsCompleted[itemsInput[index]]);
		storeToLocalInput("inputs", itemsInput);
		localStorage.setItem('object', JSON.stringify(result));
		localStorage.setItem('itemsCompleted', JSON.stringify(itemsCompleted));
	});

	$(document).on('change', '.listCheckbox', function() 
	{
		index = $('.listCheckbox').index(this);
		if($(this).attr('checked')) 
		{
			$(this).removeAttr('checked');
			$(this).next().removeClass('completed');
			itemsCompleted[itemsInput[index]] = 0; 
			localStorage.setItem('itemsCompleted', JSON.stringify(itemsCompleted));
		} 
		else 
		{
			$(this).attr('checked', 'checked');
			$(this).next().addClass('completed');
		    itemsCompleted[itemsInput[index]] = 1; 
			localStorage.setItem('itemsCompleted', JSON.stringify(itemsCompleted));
		}



	    

	});
		

	// loadList
	function loadList(items){
		$('li').remove();
		if(itemsInput.length > 0) {
			for(var i = 0; i < itemsInput.length; i++) {
				completed_class =  (itemsCompleted[itemsInput[i]] == 1) ? ' completed' : '';
				is_checked = (itemsCompleted[itemsInput[i]] == 1) ? ' checked' : ''
				$('ul').append('<li class= "list-group-item"><input class="listCheckbox" type="checkbox"' +  is_checked + '/><span class="content' + completed_class + '">' + itemsInput[i] + '</span><span id="itemIcons"><span class="glyphicon glyphicon-edit" data-toggle="modal" data-target="#editModal"></span> <span class="glyphicon glyphicon-remove"></span></span></li>');
			}
		}
	};


	function storeToLocalInput(key, items){
		localStorage[key] = JSON.stringify(itemsInput);
	}

	function getFromLocal(key){
		if(localStorage[key])
			return JSON.parse(localStorage[key]);
		else 
			return [];
	}

});
