    function loginAsAdmin() {
        document.getElementById("loginTypeButtons").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("username").value = "admin";
    }

    function loginAsUser() {
        document.getElementById("loginTypeButtons").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("username").value = "user";
    }

    function login() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }

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

    function loginAsAdmin() {
        document.getElementById("loginTypeButtons").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("username").value = "admin"; 
        document.getElementById("password").setAttribute("placeholder", "admin123");
    }
    
    function loginAsUser() {
        document.getElementById("loginTypeButtons").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("username").value = "user";
        document.getElementById("password").setAttribute("placeholder", "user123");
    }
    
    function login() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
    
        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }
    
        var placeholder = document.getElementById("password").getAttribute("placeholder");
    
        if (password !== placeholder) {
            alert("Incorrect password.");
            return;
        }
    
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
