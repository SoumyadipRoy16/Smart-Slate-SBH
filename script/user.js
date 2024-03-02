function loginAsAdmin() {
    document.getElementById("loginTypeButtons").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("username").value = "admin"; // Set hardcoded username
    document.getElementById("password").setAttribute("placeholder", "admin123");
}

function loginAsUser() {
    document.getElementById("loginTypeButtons").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("username").value = "user"; // Set hardcoded username
    document.getElementById("password").setAttribute("placeholder", "user");
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Example validation, replace with your actual validation logic
    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

    // Get the placeholder based on the username
    var placeholder = document.getElementById("password").getAttribute("placeholder");

    // Check if the entered password matches the placeholder
    if (password !== placeholder) {
        alert("Incorrect password.");
        return;
    }

    if ((username === "admin" && password === "admin123") || (username === "user" && password === "user123")) {
        if (username == "admin") {
            window.location.href = "admin_dashboard.html";
        } else {
            window.location.href = "user_dashboard.html";
        }
    }
}
