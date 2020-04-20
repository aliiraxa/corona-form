$(document).ready(function(){
    var counter = 2;
    $("#addButton").click(function () {
	if(counter>5){
            alert("Only 5 Kids are allow in one form");
            return false;
	}
	var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'TextBoxDiv' + counter);
	 $('#TextBoxesGroup tr:last').after('<tr id=TextBoxDiv' + counter+'><td class="style6" width="114"><label>' + ' Child\'s First Name: </label></td>' +
	      '<td  ><input class="form-control" size="20" name="CH_ChildsFirstName' + counter + '" class="text"' + 
      ' id="CH_ChildsFirstName' + counter + '_S" placeholder="Child\'s First Name" maxlength="100" maxsize="100" required type="text">' + '</td><td class="style6"><label>' + ' Child\'s Last Name: </label>' +
      '<td  ><input class="form-control" type="text" required  maxlength="100" maxsize="100"  placeholder="Child\'s Last Name"  name="CH_ChildsLastName' + counter +
      '" id="CH_ChildsLastName' + counter + '" value="" >'+ '</td></tr><tr id=Text2BoxDiv' + counter+'><td class="style6" width="114"><label>' +  ' Child\'s Date of Birth: </label>' +
      '<td  ><input class="form-control" type="date" required maxlength="100" maxsize="100"  placeholder="MM/DD/YYYY" name="CH_ChildsDateOfBirth' + counter +
      '" id="CH_ChildsDateOfBirth' + counter + '" value="" >'+ '</td><td class="style6" width="114"><label>' + ' Child\'s Sex: </label>' +
      '</td><td  ><select class="form-control" name="CH_ChildsSex' + counter + '" id="CH_ChildsSex' + counter + '" required value>' + '<option value="">Select One</option> <option value="Male">Male</option> <option value="Female">Female</option> </select></td></tr>');
	//newTextBoxDiv.appendTo("#TextBoxesGroup");
	$('#TextBoxesGroup tr:last').after(newTextBoxDiv);
	counter++;
     });

    $("#addButton1").click(function () {
        if(counter>5){
            alert("Only 5 Kids are allow in one form");
            return false;
        }
        var newTextBoxDiv = $(document.createElement('div'))
             .attr("id", 'TextBoxDiv' + counter);
         $('#TextBoxesGroup tr:last').after('<tr id=TextBoxDiv' + counter+'><td  ><input class="form-control" size="20" name="CH_ChildsFirstName' + counter + '" class="text"' +
      ' id="CH_ChildsFirstName' + counter + '_S" placeholder="Child\'s First Name" maxlength="100" maxsize="100" required type="text">' + '</td>' +
      '<td  ><input class="form-control" type="text" required  maxlength="100" maxsize="100"  placeholder="Child\'s Last Name"  name="CH_ChildsLastName' + counter +
      '" id="CH_ChildsLastName' + counter + '" value="" >'+ '</td>' +
      '<td  ><input class="form-control" type="date" required maxlength="100" maxsize="100"  placeholder="MM/DD/YYYY" name="CH_ChildsDateOfBirth' + counter +
      '" id="CH_ChildsDateOfBirth' + counter + '" value="" >'+ '</td>' +
      '<td  ><div class="styled-select"><select class="form-control" name="CH_ChildsSex' + counter + '" id="CH_ChildsSex' + counter + '" required value>' + '<option value="">Child\'s Sex</option> <option value="Male">Male</option> <option value="Female">Female</option> </select></td></tr>');
        //newTextBoxDiv.appendTo("#TextBoxesGroup");
        $('#TextBoxesGroup tr:last').after(newTextBoxDiv);
        counter++;
     });		               
     $("#removeButton").click(function () {
	if(counter==2){
		               
				$("#dialog-message").dialog({
								    modal: true,
								    draggable: false,
								    resizable: false,
								    show: 'blind',
								    hide: 'blind',
								    title:'No more Children to remove',
								    width: 350,
								    height: 150,
								    dialogClass: 'ui-dialog-osx',
								    buttons: {
									      "Close": function() {
									       $(this).dialog("destroy"); $('#dialog-message').empty(); }
									       }
						});



          //alert("No more Children to remove");
          return false;
       }
	counter--;
        $("#TextBoxDiv" + counter).remove();
        $("#Text2BoxDiv" + counter).remove();
     });
     $("#getButtonValue").click(function () {
	var msg = '';
	for(i=1; i<counter; i++){
   	  msg += "\n Textbox #" + i + " : " + $('#CH_ChildsFirstName' + i).val();
   	  msg += "\n Textbox #" + i + " : " + $('#CH_ChildsLastName' + i).val();
   	  msg += "\n Textbox #" + i + " : " + $('#CH_ChildsSex' + i).val();
	}
    	  alert(msg);
     });
  });
