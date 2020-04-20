function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  
        
}
function signatureCapture() {
	var canvas = document.getElementById("newSignature");
	var context = canvas.getContext("2d");
	var x =0;
	var y =0;
	var width = 200;
	var height = 100;
	var radius = 10;
	canvas.width = 200;
	canvas.height = 100;
	context.fillStyle = "#fff";
	context.strokeStyle = "#444";
	context.lineWidth = 1.5;
	context.lineCap = "round";
	roundRect(context, x, y, canvas.width, canvas.height, radius, context.fillStyle, context.strokeStyle)
	
	//context.fillRect(0, 0, canvas.width, canvas.height);
	var disableSave = true;
	var pixels = [];
	var cpixels = [];
	var xyLast = {};
	var xyAddLast = {};
	var calculate = false;
	{ 	//functions
		function remove_event_listeners() {
			canvas.removeEventListener('mousemove', on_mousemove, false);
			canvas.removeEventListener('mouseup', on_mouseup, false);
			canvas.removeEventListener('touchmove', on_mousemove, false);
			canvas.removeEventListener('touchend', on_mouseup, false);

			document.body.removeEventListener('mouseup', on_mouseup, false);
			document.body.removeEventListener('touchend', on_mouseup, false);
		}

		function get_coords(e) {
			var x, y;

			if (e.changedTouches && e.changedTouches[0]) {
				var offsety = canvas.offsetTop || 0;
				var offsetx = canvas.offsetLeft || 0;

				x = e.changedTouches[0].pageX - offsetx;
				y = e.changedTouches[0].pageY - offsety;
			} else if (e.layerX || 0 == e.layerX) {
				x = e.layerX;
				y = e.layerY;
			} else if (e.offsetX || 0 == e.offsetX) {
				x = e.offsetX;
				y = e.offsetY;
			}

			return {
				x : x,
				y : y
			};
		};

		function on_mousedown(e) {
			e.preventDefault();
			e.stopPropagation();

			canvas.addEventListener('mouseup', on_mouseup, false);
			canvas.addEventListener('mousemove', on_mousemove, false);
			canvas.addEventListener('touchend', on_mouseup, false);
			canvas.addEventListener('touchmove', on_mousemove, false);
			document.body.addEventListener('mouseup', on_mouseup, false);
			document.body.addEventListener('touchend', on_mouseup, false);

			empty = false;
			var xy = get_coords(e);
			context.beginPath();
			pixels.push('moveStart');
			context.moveTo(xy.x, xy.y);
			pixels.push(xy.x, xy.y);
			xyLast = xy;
		};

		function on_mousemove(e, finish) {
			e.preventDefault();
			e.stopPropagation();

			var xy = get_coords(e);
			var xyAdd = {
				x : (xyLast.x + xy.x) / 2,
				y : (xyLast.y + xy.y) / 2
			};

			if (calculate) {
				var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
				var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
				pixels.push(xLast, yLast);
			} else {
				calculate = true;
			}

			context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
			pixels.push(xyAdd.x, xyAdd.y);
			context.stroke();
			context.beginPath();
			context.moveTo(xyAdd.x, xyAdd.y);
			xyAddLast = xyAdd;
			xyLast = xy;

		};

		function on_mouseup(e) {
			remove_event_listeners();
			disableSave = false;
			context.stroke();
			pixels.push('e');
			calculate = false;
		};
	}
	canvas.addEventListener('touchstart', on_mousedown, false);
	canvas.addEventListener('mousedown', on_mousedown, false);
}

function signatureSaveOld() {

	var canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
	var dataURL = canvas.toDataURL("image/png");
	document.getElementById('hidden_data').value = dataURL;
                var fd = new FormData(document.forms["form1"]);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'upload_data.php', true);

                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                    }
                };

                xhr.onload = function() {

                };
                xhr.send(fd);
};

function signatureClear() {
	var canvas = document.getElementById("newSignature");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#fff";
	context.strokeStyle = "#444";
	canvas.style.background = '#fff';
	roundRect(context, 0, 0, canvas.width, canvas.height, 10, context.fillStyle, context.strokeStyle)
	
}

function signatureSave() {

        var canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
        var dataURL = canvas.toDataURL("image/png");
        document.getElementById('hidden_data').value = dataURL;
	var nameS = document.getElementById('Name_S').value;
        var replyemail = document.getElementById('EmailAddress_S').value;
                var fd = new FormData(document.forms["form1"]);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'upload_pf.php', true);

                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                    }
                };

                xhr.onload = function() {

                };
		$("#dialog-message").text( nameS + ", thanks for completing the info");
		$("#dialog-message").dialog({
    modal: true,
    draggable: false,
    resizable: false,
    show: 'blind',
    hide: 'blind',
    title: "Thanks",
    width: 450,
    buttons: {
        "Please click here to finish " : function() {
//window.location.reload();
	     signatureClear();
	     document.getElementById('form1').reset();
            $(this).dialog("close");
	    window.location.href = "paperwork.html";
        }
    }
});
                xhr.send(fd);
}

function medicalSave() {

        var canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
        var dataURL = canvas.toDataURL("image/png");
        document.getElementById('hidden_data').value = dataURL;
	var nameS = document.getElementById('Name_S').value;
        var replyemail = document.getElementById('EmailAddress_S').value;
                var fd = new FormData(document.forms["medical1"]);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'upload_mh.php', true);

                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                    }
                };

                xhr.onload = function() {

                };
		$("#dialog-message").text( nameS + ", thanks for completing the info");
		$("#dialog-message").dialog({
    modal: true,
    draggable: false,
    resizable: false,
    show: 'blind',
    hide: 'blind',
    title: "Thanks",
    width: 450,
    buttons: {
        "Please click here to finish " : function() {
	    //window.location.reload();
	     signatureClear();
	     document.getElementById('medical1').reset();
            $(this).dialog("close");
	    window.location.href = "paperwork.html";
        }
    }
});
                xhr.send(fd);
}

function hipaaSave() {

        var canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
        var dataURL = canvas.toDataURL("image/png");
        document.getElementById('hidden_data').value = dataURL;
	var nameS = document.getElementById('HP_YourName').value;
        //var replyemail = document.getElementById('EmailAddress_S').value;
                var fd = new FormData(document.forms["hippa1"]);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'upload_hipaa.php', true);

                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                    }
                };

                xhr.onload = function() {

                };
		$("#dialog-message").text( nameS + ", thanks for completing the info");
		$("#dialog-message").dialog({
    modal: true,
    draggable: false,
    resizable: false,
    show: 'blind',
    hide: 'blind',
    title: "Thanks",
    width: 450,
    buttons: {
        "Please click here to finish " : function() {
	    //window.location.reload();
	     signatureClear();
	     document.getElementById('hippa1').reset();
            $(this).dialog("close");
	    window.location.href = "paperwork.html";

        }
    }
});
                xhr.send(fd);
}

function covidSave() {

    var canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL("image/png");
    document.getElementById('hidden_data').value = dataURL;
var nameS = document.getElementById('CV_YourName').value;
    alert(nameS);
    //var replyemail = document.getElementById('EmailAddress_S').value;
            var fd = new FormData(document.forms["covid1"]);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'upload_covid.php', true);

            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100;
                    console.log(percentComplete + '% uploaded');
                }
            };

            xhr.onload = function() {

            };
    $("#dialog-message").text( nameS + ", thanks for completing the info");
    $("#dialog-message").dialog({
modal: true,
draggable: false,
resizable: false,
show: 'blind',
hide: 'blind',
title: "Thanks",
width: 450,
buttons: {
    "Please click here to finish " : function() {
    //window.location.reload();
     signatureClear();
     document.getElementById('covid1').reset();
        $(this).dialog("close");
    window.location.href = "paperwork.html";

    }
}
});
            xhr.send(fd);
}

function referralSave() {
	
        //var replyemail = document.getElementById('EmailAddress_S').value;
                var fd = new FormData(document.forms["referral1"]);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'upload_referral.php', true);

                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                    }
                };

                xhr.onload = function() {

                };
		$("#dialog-message").text( "Thanks for the referral");
		$("#dialog-message").dialog({
    modal: true,
    draggable: false,
    resizable: false,
    show: 'blind',
    hide: 'blind',
    title: "Thanks",
    width: 450,
    buttons: {
        "Please click here to finish " : function() {
	    //window.location.reload();
	    // signatureClear();
	     document.getElementById('referral1').reset();
            $(this).dialog("close");
	    window.location.href = "referral.html";

        }
    }
});
                xhr.send(fd);
}


function signatureSend() {
	var canvas = document.getElementById("newSignature");
	var dataURL = canvas.toDataURL("image/png");
	document.getElementById("saveSignature").src = dataURL;
	var sendemail = document.getElementById('sendemail').value;
	var replyemail = document.getElementById('replyemail').value;

var form = document.createElement("form");
form.setAttribute("action","upload_file.php");
form.setAttribute("enctype","multipart/form-data");
form.setAttribute("method","POST");
form.setAttribute("target","_self");
form.innerHTML = '<input type="text" name="image" value="'+dataURL+'"/>'+'<input type="email" name="email" value="'+sendemail+'"/>'+'<input type="email" name="replyemail" value="'+replyemail+'"/>';
form.submit();


}
function verify() {
	
        var bSubmit = true;
        $("label.required").each(function(){
            var txtAttrb = $(this).attr('for');
            if(txtAttrb.length > 0)
            {
                var txtVal = $("input[id=" + txtAttrb + "]");
                if(txtVal.val().length == 0)
                {
                 
                   
		  // $(txtAttrb).append( "<br><font color='red'>Please enter value</font>");
		   var elId="#" + txtAttrb;
		   txtVal.addClass('focus1');
		   txtVal.focus();
		   bSubmit = false;
                   
                }
            }
	   
        });
        
        if(bSubmit == true)
        {
	 
         signatureSave();
        }
	return bSubmit;
}

      
