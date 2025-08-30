import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import BookMarkController from '@controllers/BookMarkController';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class BookMarkRoute implements Route {
    public bookmarkListPath = '/api/bookmarks/list';
    public removeBookmarkPath = '/api/remove/bookmark';
    public updateBookmarkPath = '/api/update/bookmark';
    public router = Router();
    public bookMarkController: BookMarkController;
    constructor(bookMarkController: BookMarkController) {
        this.bookMarkController = bookMarkController;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.bookmarkListPath}`, this.bookMarkController.bookMarkList);
        this.router.put(`${this.removeBookmarkPath}`, this.bookMarkController.removeBookmark);
        this.router.post(`${this.updateBookmarkPath}`, this.bookMarkController.updateBookmark);
    }
}

export default BookMarkRoute;
