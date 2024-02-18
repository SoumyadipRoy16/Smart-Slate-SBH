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

        // Example validation, replace with your actual validation logic
        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }

        // Hardcoded username and password for demonstration purposes
        if ((username === "admin" && password === "admin123") || (username === "user" && password === "user123")) {
            if (username === "admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "user_dashboard.html";
            }
        } else {
            alert("Incorrect username or password.");
        }
    }