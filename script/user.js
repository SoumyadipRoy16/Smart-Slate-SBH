    function loginAsAdmin() {
        document.getElementById("loginTypeButtons").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("username").value = "admin"; // Set hardcoded username
    }

    function loginAsUser() {
        document.getElementById("loginTypeButtons").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("username").value = "user"; // Set hardcoded username
    }

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

    var placeholder = document.getElementById("password").getAttribute("data-" + username + "-placeholder");

    if (password !== placeholder) {
        alert("Incorrect password.");
        return;
    }

    if (username === "admin") {
        window.location.href = "admin_dashboard.html";
    } else {
        window.location.href = "user_dashboard.html";
    }
}
