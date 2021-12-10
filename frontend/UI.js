import BookService from './services/BookService'
const bookService = new BookService();

import { format } from 'timeago.js';

class UI {

    constructor() {

    }

    async renderBooks() {
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="" class="img-fluid"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="delete-left" class="bi" width="24" height="24" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M512 64H205.3C188.3 64 172 70.75 160 82.75L9.375 233.4c-12.5 12.5-12.5 32.75 0 45.25L160 429.3C172 441.3 188.3 448 205.3 448H512c35.38 0 64-28.62 64-64V128C576 92.63 547.4 64 512 64zM432.1 303c9.375 9.375 9.375 24.56 0 33.94c-9.381 9.381-24.56 9.373-33.94 0L352 289.9l-47.03 47.03c-9.381 9.381-24.56 9.373-33.94 0c-9.375-9.375-9.375-24.56 0-33.94l47.03-47.03L271 208.1c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L352 222.1l47.03-47.03c9.375-9.375 24.56-9.375 33.94 0s9.375 24.56 0 33.94l-47.03 47.03L432.1 303z"></path></svg></a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.create_at)}
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(div);
        });
    }

    async addNewBook(book) {
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm() {
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#message');

        container.insertBefore(div, bookForm);
        setTimeout(()=>{
            document.querySelector('.message').remove();
        }, secondsToRemove)
    }

    async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }
}

export default UI;
