import { client } from "./client.js";
import { db } from "./db.js";
import { DeleteConfirmModal } from "./Modal.js";
import { ActiveCh } from "./notes.js";

export const Bar = function (chapters) {
    const { id, title, noteBookId } = chapters;
    const $chapter = document.createElement('button');
    $chapter.classList.add('chapter-name', 'primary');
    $chapter.setAttribute('data-chapter', id);
    $chapter.innerHTML = `${title} <span class="remove-chapter active"><i class="fa-solid fa-x"></i></span>`;

    $chapter.addEventListener('click', function () {
        ActiveCh.call(this);
    });

    const DeleteChBtn = $chapter.querySelector('.remove-chapter');
    DeleteChBtn.addEventListener('click', function () {
        const MODAL = DeleteConfirmModal(title);
        MODAL.open();
        MODAL.onSubmit(function (isConfirm) {
            if (isConfirm) {
                const ExistedChpt = db.delete.chapters(noteBookId, id);
                client.chapter.Delete(id, ExistedChpt.length);
            }
            MODAL.close();
        })

        if (MODAL.open) {
            window.addEventListener('keydown', function (event) {
                if (event.key == 'Escape') {
                    MODAL.close();
                }
            });
        }
    })

    return $chapter;
}