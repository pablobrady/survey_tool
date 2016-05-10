// Userlist data array for filling in info box
window.userListData = [];

// Field Validation Errors
window.validateErrors = {
	'EMPTY_STRING': '1',
	'EMPTY_INVALID_CHARS': '2'
};

// survey_tool_admin.js
window.userDataTool = {
	"initialized": "false",
	"initialize": function() {
		this.initialized = "true";
		if( typeof(window.validateErrors) !== 'object' ) {
			console.log("UserDataTool INIT ERROR:  \'window.validateErrors\' was not visible on \'window.userDataTool\' initialization!!!");
			return;
		}
		console.log("UserDataTool INITIALIZED!");
	},
	"addUser": function(event) {
		event.preventDefault();

		// Super basic validation - increase validationErrorNum var if any fields are blank
		var validationErrorNum = 0;
		$('#addUser input').each(function(index, val) {
console.log("$(this).val() = " + $(this).val());
			if( $(this).val() === '' ) { validationErrorNum = window.validateErrors.EMPTY_STRING; }
			if( $(this).val().match(/[\[\]\(\)<>&\;@#$%^&*\"]/) ) { window.validateErrors.INVALID_STRING; }
		});

		// Check and make sure validationErrorNum's still at zero
		if( validationErrorNum === 0 ) {
			// No errors?  Compile all user info into one object
			var newUser = {
				'firstname': $('#addUser fieldset input#inputUserFirstname').val(),
				'lastname': $('#addUser fieldset input#inputUserLastname').val(),
				'jobtitle': $('#addUser fieldset input#inputUserJobtitle').val(),
				'email': $('#addUser fieldset input#inputUserEmail').val(),
				'company': $('#addUser fieldset input#inputUserCompany').val(),
				'country': $('#addUser fieldset input#inputUserCountry').val()
			};
	console.log("newUser = ", newUser);

			// User AJAX to post the object ot our adduser service
			$.ajax({
				type: 'POST',
				data: newUser,
				url: '/users/adduser',
				dataType: 'JSON'
			}).done(function(response) {

				// Check for successful (blank) response
				if( response.msg === '' ) {
					$('#addUser fieldset input').val(''); // Clears ALL INPUTs, regardless of #id

					// Successful!  On to the next page... (Pass a session id???)
					// window.location.href = '/survey';

				} else {
					var eMsg = 'You have entered invalid input. (Rejected by server.)'
					$('#errorMsg').html(eMsg + ' ');

				}

			});

		} else {
			// If validationErrorNum > 0, error out...
			var eMsg = 'You have one or more an empty fields.';
			$('#errorMsg').html(eMsg + ' ');
		}
	},
	"resetAnswerForm": function(event) {
			// if(input.attr('type')=='text'){
			// 	document.getElementById(input.attr('id')).value = null;
			// } else if(input.attr('type')=='radio'){
			// 	document.getElementById(input.attr('id')).checked = false;
			// }
	},
	"submitAnswer": function(event) {

	}
};

// DOM Ready =============================================================
$(document).ready(function() {

	window.userDataTool.initialize();

	$('#btnAddUser').on('click', window.userDataTool.addUser);

});

