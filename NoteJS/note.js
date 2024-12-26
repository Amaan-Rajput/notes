import { client } from "./client.js";
import { db } from "./db.js";
import { DeleteConfirmModal, NoteModel } from "./Modal.js";
import { CallNotification, getRelativeTime } from "./notes.js";
import { Tooltip } from "./tooltip.js";

export const Note = function (note) {
    const { id, title, text, PostedOn, noteBookId } = note;
    const $note = document.createElement('div');
    $note.classList.add('notes-container');
    $note.setAttribute('data-note', id);
    $note.innerHTML = `
        <div class="container-title">
            <h3>${title}</h3>
        </div>
        <div class="container-body">${text}</div>
        <div class="container-footer">
        <span class="time">${getRelativeTime(PostedOn)}</span>
        <div class="icons">
            <button class="note-edt-icon primary" data-Edit-Note data-tooltip="Edit Note"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="note-bin-icon primary" data-delete-Note data-tooltip="Delete Note"><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>`;

    Tooltip($note.querySelector('[data-tooltip]'));

    $note.addEventListener('click', function () {
        const Model = NoteModel(title, text, getRelativeTime(PostedOn));
        Model.open();
        Model.submit(function (note) {
            const updateDate = db.update.note(id, note);
            client.Note.Update(id, updateDate)
            Model.close();
        });
    });
    const deleteNoteBtn = $note.querySelector('[data-delete-Note]');
    
    deleteNoteBtn.addEventListener('click', function (event) {
        event.stopImmediatePropagation();
        const Model = DeleteConfirmModal(title);
        Model.open()
        Model.onSubmit(function (isConfirm) {
            if (isConfirm) {
                const existedNote = db.delete.note(noteBookId, id);
                client.Note.delete(id, existedNote.length);
                CallNotification('<i class="fa-solid fa-trash-arrow-up"></i>','remove', title, 'note');
            }
            Model.close();
        })
    })

    return $note;
}
