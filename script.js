
window.addEventListener("load", function () {
    // Load saved notes from localStorage on page load
    loadNotes();

    // Add event listener to the "Add Note" button
    document.getElementById("addBtn").addEventListener("click", function () {
        const input = document.getElementById("noteInput");
        const noteText = input.value.trim();

        if (noteText === "") return;

        addNote(noteText);
        saveNoteToLocalStorage(noteText);
        input.value = "";
    });
});

// Function to add a note to the list
function addNote(noteText) {
    const li = document.createElement("li");

    // Create editable text span
    const span = document.createElement("span");
    span.textContent = noteText;
    span.contentEditable = true;
    span.addEventListener("blur", function () {
        updateAllNotesInLocalStorage();
    });

    // Create delete button
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

// Save a new note to localStorage
function saveNoteToLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load all notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.forEach(note => addNote(note));
}

// Save all current notes in the list to localStorage (after edit/delete)
function updateAllNotesInLocalStorage() {
    const spans = document.querySelectorAll("#notesList span");
    const updatedNotes = Array.from(spans).map(span => span.textContent.trim());
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
}
