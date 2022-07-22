function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}
