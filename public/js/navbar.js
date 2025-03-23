
document.getElementById("openSidebar").addEventListener("click", function () {
    document.getElementById("sidebar").classList.add("active");
    document.getElementById("overlay").classList.add("active");
});

document.getElementById("closeSidebar").addEventListener("click", function () {
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
});

document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
});