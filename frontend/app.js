import './styles/app.css';
import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
});

document.getElementById('book-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const link = document.getElementById('link').value;
        const image = document.getElementById('image').files;

        const formData = new FormData();
        formData.append('image', image[0]);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('link', link);

        const ui = new UI();
        ui.addNewBook(formData);
        ui.renderMessage('new Book Added', 'success', 4000);
    })

document.getElementById('books-cards')
    .addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            const ui = new UI();
            ui.deleteBook(e.target.getAttribute('_id'));
            ui.renderMessage('Book Remove', 'danger', 4000);
        }
        e.preventDefault();
    });