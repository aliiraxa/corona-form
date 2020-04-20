function showDialog()
{
		var page = "./HIPAA_NOTICE.htm";
		$("#dialog-message").html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>');
			               
		$("#dialog-message").dialog({
			    modal: true,
			    draggable: false,
			    resizable: false,
			    show: 'blind',
			    hide: 'blind',
			    width: 550,
			    height: 550,
			    dialogClass: 'ui-dialog-osx',
			    buttons: {
				            "I've read and understand this": function() {
						                $(this).dialog("destroy");
						                $('#dialog-message').empty();
								        }
					        }
		});
}
