document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".menu > li");

    menuItems.forEach(item => {
        const submenu = item.querySelector(".submenu");
        const link = item.querySelector("a");

        if (submenu) {
            link.addEventListener("click", function(e) {
                e.preventDefault(); // Ngăn điều hướng link

                // Đóng các menu khác
                menuItems.forEach(i => {
                    if (i !== item) i.classList.remove("open");
                });

                // Toggle mở/đóng menu con
                item.classList.toggle("open");
            });
        }
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener("click", function(e) {
        if (!e.target.closest(".menu")) {
            menuItems.forEach(item => item.classList.remove("open"));
        }
    });
});