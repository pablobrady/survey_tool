window.adminTool = {
	'initialized': 'false',
	'initialize': function() {
		this.initialized = 'true';
		console.log("adminTool INITIALIZED!");
	},
	'populateTable': function() {
		console.log("populateTable() arrival.");

		// Empty content string (for future AJAX response storage)
		var tableContent = '';

		// jQuery AJAX call for JSON
		$.getJSON( '/users/userlist', function( data ) {

			// Stick ALL our user data array into a userlist variable in the global object
			window.userListData = data;

			// For each item in our JSON, add a table row and cells to the content string
			$.each(data, function(){
				tableContent += '<tr>';
				tableContent += '<td><a href="#" class="linkshowuser" rel="' + this._id + '">' + this.lastname + ', ' + this.firstname + '</a></td>';
				tableContent += '<td>' + this.email + '</td>';
				tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
				tableContent += '</tr>';
			});

			// Inject the whole content string into our existing HTML table
			$('#userList table tbody').html(tableContent);
		}).done(function() {
		  console.log( "AJAX done." );
		})
		.fail(function(e) {
		  console.log( "AJAX error", e.status );
		})
		.always(function() {
		  // console.log( "AJAX Finalize" );
		});

	},
	'showUserInfo': function(event) {

		event.preventDefault();

		// Retrieve username from link rel attribute
		var thisUserId = $(this).attr('rel');

		var arrayPosition = window.userListData.map(function(arrayItem) { 
			return arrayItem._id; 
		}).indexOf(thisUserId); // Return the _id of the rel='xx' I just clicked (see table above)

		console.log("arrayPosition = ", arrayPosition);

		// Get our User Object
		var thisUserObject = window.userListData[arrayPosition];

		//Populate Info Box
		$('#userInfoFirstname').text(thisUserObject.firstname);
		$('#userInfoLastname').text(thisUserObject.lastname);
		$('#userInfoJobtitle').text(thisUserObject.jobtitle);
		$('#userInfoEmail').text(thisUserObject.email);
		$('#userInfoCompany').text(thisUserObject.company);
		$('#userInfoCountry').text(thisUserObject.country);

	},
	'deleteUser': function(event) {

		event.preventDefault();

		var confirmation = confirm('Are you sure you want to delete this user?');

		// Check and make sure the uiser confirmed
		if (confirmation === true) {

			// User confirmed... do our delete...
			$.ajax({
				type: 'DELETE',
				url: '/users/deleteuser/' + $(this).attr('rel')
			}).done(function(response) {

				// Check for a successful (blank) response
				if (response.msg === '') {
				} else {
					alert('ERROR:  ' + response.msg);
				}

				// Update the table
				window.adminTool.populateTable();  // best scope?

			});

		} else {

			// User confirmed NO.  No delete.
			return false;

		}
	}
};


// DOM Ready =============================================================
$(document).ready(function() {

	window.adminTool.initialize();

	// Populate the user table on initial page load
	window.adminTool.populateTable();

	// Admin Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', window.adminTool.showUserInfo);

	// Admin 'Delete User' link click
	$('#userList table tbody').on('click', 'td a.linkdeleteuser', window.adminTool.deleteUser);


});
