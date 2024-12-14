import { Book } from "./Book.js";
import { Note } from "./note.js";
import { ActiveBook, CallNotification } from "./notes.js";

const Bag = document.querySelector('.bag');
const notes = document.querySelector('.notes');

const BookNameInTitle = document.querySelector('#BookName');
const $NoteAddBtns = document.querySelectorAll('[data-NoteAdd-btn]');

const welcomePageTemplate = `
    <div class="welcome-page emtpy-book">
        <h2 class="text">welcome to our notekeeper</h2>
        <img src="href="https://amaan-rajput.github.io/notes/Noteimage/first-page.svg" alt="" height="90%" width="100%" >
    </div>`;

const emptyNotesTemplate = `
        <div class="emtpy-book">
            <img src="href="https://amaan-rajput.github.io/notes/Noteimage/Data-not-found.svg" alt="" height="100%" width="100%">
            <h2>Please Add Notes</h2>
        </div> `;

const disableNoteCreateBtns = function (isNotAnyNoteBook) {
    $NoteAddBtns.forEach($item => {
        $item[isNotAnyNoteBook ? 'removeAttribute' : 'setAttribute']('disabled', '');
    })
}


export const client = {
    NoteBook: {
        create(noteBookData) {
            const $book = Book(noteBookData.id, noteBookData.name);
            Bag.appendChild($book);
            ActiveBook.call($book);
            BookNameInTitle.innerHTML = noteBookData.name;
            notes.innerHTML = emptyNotesTemplate;
            disableNoteCreateBtns(true);
            CallNotification('<i class="fa-solid fa-check"></i>','Add new',noteBookData.name,'NoteBook');
        },

        Read(noteBookList) {
            disableNoteCreateBtns(noteBookList.length)
            noteBookList.forEach(noteBookData => {
                const $book = Book(noteBookData.id, noteBookData.name);
                Bag.appendChild($book);
            });
        },

        Update(noteBookId, noteBookData) {
            const $oldNoteBook = document.querySelector(`[Data-noteBook="${noteBookId}"]`);
            const $newnoteBook = Book(noteBookId.id, noteBookData.name);

            BookNameInTitle.textContent = noteBookData.name;
            Bag.replaceChild($newnoteBook, $oldNoteBook);
            ActiveBook.call($newnoteBook);
            CallNotification('<i class="fa-solid fa-text-width"></i>','updated',noteBookData.name,'NoteBook');
        },
        Delete(noteBookId, noteBookData) {
            const DeleteNoteBook = document.querySelector(`[data-notebook="${noteBookId}"]`);
            const activebook = DeleteNoteBook.nextElementSibling ?? DeleteNoteBook.previousElementSibling;
            if (activebook) {
                activebook.click();
            } else {
                BookNameInTitle.innerHTML = '';
                notes.innerHTML = welcomePageTemplate;
                disableNoteCreateBtns(false);

            }
            DeleteNoteBook.remove();
        }
    },
    Note: {
        create(note) {
            if (!notes.querySelector('[data-note]')) notes.innerHTML = '';
            const $note = Note(note);
            notes.appendChild($note);
            CallNotification('<i class="fa-solid fa-check"></i>',"add new",note.title,"note") ;
        },
        read(noteList) {
            if (noteList.length) {
                notes.innerHTML = '';
                noteList.forEach(note => {
                    const $note = Note(note);
                    notes.appendChild($note);
                })
            } else {
                notes.innerHTML = emptyNotesTemplate;
            }
        },
        Update(noteId, note) {
            const $oldNote = document.querySelector(`[data-note="${noteId}"]`);
            const $newNote = Note(note);
            notes.replaceChild($newNote, $oldNote);
            CallNotification('<i class="fa-solid fa-text-width"></i>','updated', note.title, 'note')
        },
        delete(noteId, isNoteExists) {
            document.querySelector(`[data-note="${noteId}"]`).remove();
            if (!isNoteExists) notes.innerHTML = emptyNotesTemplate;
        }
    }

} 