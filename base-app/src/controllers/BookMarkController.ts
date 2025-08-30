import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import { BookMarkService } from "@services/bookmark.service";

@injectable()
class BookMarkController {
    
    bookmarkService:BookMarkService;
    constructor(bookmarkService:BookMarkService) {
        this.bookmarkService = bookmarkService;
    }

    public bookMarkList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let output = await this.bookmarkService.getBookMarkList(req, res);
            res.status(200);
            res.json(output);
        } catch (error) {
            next(error);
        }
    }

    public removeBookmark = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let output = await this.bookmarkService.removeBookmark(req, res);
            res.status(200);
            res.json(output);
        } catch (error) {
            next(error);
        }
    }

    public updateBookmark = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            let output = await this.bookmarkService.updateBookmark(req,res);
            res.status(200);
            res.json(output);
        } catch (error) {
            next(error);
        }
    }

}

export default BookMarkController;