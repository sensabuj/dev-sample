import { TokenHelper } from "@utils/TokenHelper";
import { injectable } from "tsyringe";
import { AccountSummaryDTO } from "@models/accountsummary.models";
import { logger } from "@utils/logger";
import { Request, Response } from "express";
import { CacheWrapperService } from '@utils/CacheWrapperService';
import * as util from 'util';
import  multer from 'multer';

const maxSize = 2 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  "./uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
    });
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    }).single("file");

@injectable()
export class FileUploadService {
    tokenHelper: TokenHelper;
    cache: CacheWrapperService = CacheWrapperService.getInstance();
    constructor(tokenHelper: TokenHelper) {
        this.tokenHelper = tokenHelper;
    }
    
public uploadFile = util.promisify(upload);
    

}