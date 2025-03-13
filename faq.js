function toggleAnswer(id) {
    const answer = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    if (answer.style.display === "none") {
        answer.style.display = "block";
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
    } else {
        answer.style.display = "none";
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
    }
}