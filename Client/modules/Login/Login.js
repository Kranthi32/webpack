$(document).ready(function() {
	$("#signin").click(function(event) {
		event.preventDefault();
		var username = $("#username").val();
		var password = $("#password").val();

		$.ajax({
			type: "POST",
			url: "/login",
			data: {
				username: username,
				password: password
			},
			success: function(response) {
				
			},
			error: function(xhr, status, error) {
				
			}
		});
	});
});
