document.addEventListener("DOMContentLoaded", function () {
    const openSidebar = document.getElementById("openSidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const overlay = document.getElementById("overlay");
    const sidebar = document.getElementById("sidebar");

    openSidebar.addEventListener("click", function () {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    closeSidebar.addEventListener("click", function () {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    
    document.getElementById("logoutBtn").addEventListener("click", async () => {
        let response = await fetch("/application/logout", { method: "POST" });
        let result = await response.json();
        if (result.success) {
            alert(result.message);
            window.location.href = "/login";
        } else {
            alert("Logout failed!");
        }
    });
});
