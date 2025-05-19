
window.addEventListener("load", function () {
loadNotes();

    document.getElementById("addBtn").addEventListener("click", function () {
        const input = document.getElementById("noteInput");
        const noteText = input.value.trim();

        if (noteText === "") return;

        addNote(noteText);
        saveNoteToLocalStorage(noteText);
        input.value = "";
    });
});

function addNote(noteText) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = noteText;
    span.contentEditable = true;
    span.addEventListener("blur", function () {
        updateAllNotesInLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        li.remove();
        updateAllNotesInLocalStorage();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("notesList").appendChild(li);
}
function saveNoteToLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.forEach(note => addNote(note));
}
function updateAllNotesInLocalStorage() {
    const spans = document.querySelectorAll("#notesList span");
    const updatedNotes = Array.from(spans).map(span => span.textContent.trim());
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
}
