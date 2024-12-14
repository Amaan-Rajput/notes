import { Tooltip } from "./tooltip.js";
import { ActiveBook, addEventOnElements, CallNotification, MakeBookEdit } from "./notes.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { DeleteConfirmModal } from "./Modal.js";


const BookNameInTitle = document.querySelector('#BookName');

export const Book = function (id, name) {
    const $book = document.createElement('div');
    $book.classList.add('book');
    $book.setAttribute('Data-noteBook', id);

    $book.innerHTML = `
            <span class="title">${name}</span>
            <div class="icon-cantaner">
                <button class="book-edit-icon" data-tooltip="Edit Notebook"><i class="fa-solid fa-pen-fancy"></i></button>
                <button class="book-delete-icon" data-delete-btn data-tooltip="Detele Notebook"><i class="fa-solid fa-trash"></i></button>
            </div>
    `;

    const $tooltipElems = $book.querySelectorAll('[data-tooltip]');
    $tooltipElems.forEach($elem => Tooltip($elem));

    $book.addEventListener('click', function () {
        BookNameInTitle.textContent = name;
        ActiveBook.call(this);

        const noteList = db.get.note(this.dataset.notebook);
        client.Note.read(noteList)
    });

    const bookEditIcon = $book.querySelector('.book-edit-icon');
    const Title = $book.querySelector('.title');

    bookEditIcon.addEventListener('click', MakeBookEdit.bind(null, Title));

    Title.addEventListener('keydown', function (event) {
        if (event.key == 'Enter') {
            this.removeAttribute('contenteditable');
            const UpdateNoteBookDate = db.update.noteBook(id, this.textContent);
            client.NoteBook.Update(id, UpdateNoteBookDate);

        }
    });

    const bookDeleteIcon = $book.querySelector('[data-delete-btn]');

    bookDeleteIcon.addEventListener('click', function () {
        const MODAL = DeleteConfirmModal(name);

        MODAL.open();

        MODAL.onSubmit(function (isConfirm) {
            if (isConfirm) {
                db.delete.noteBook(id);
                client.NoteBook.Delete(id);
                CallNotification('<i class="fa-solid fa-trash-arrow-up"></i>','remove', name, 'NoteBook');
            }
            MODAL.close();
        });
        if (MODAL.open) {
            bookDeleteIcon.blur();
            window.addEventListener('keydown', function (event) {
                if (event.key == 'Escape') {
                    MODAL.close();
                }
            });
        }
    });

    return $book;
}
