import { UploadFileDTO } from "@models/uploadFile.model";
import { injectable } from "tsyringe";
import { logger } from "@utils/logger";
import { Request, response, Response } from "express";
import { SharePointsHelper } from "@utils/SharePointHelper";

import config from "@config/endpoints.config";

@injectable()
export class UploaderService {
  sharePointsHelper: SharePointsHelper;
  constructor(sharePointsHelper: SharePointsHelper) {
    this.sharePointsHelper = sharePointsHelper;
  }
  public getFileObject(req: Request) {
    return {
      requestFrom: "SHAREPOINT",
      fileName: "documentName",
      fileContent: "string",
      fileTag: "tagBase",
      fileSize: "documentSize",
      fileType: "documentExtension",
    };
  }
  public async saveFiletoDB(fileObject) {
    try {
      await this.sharePointsHelper.saveDBObject(fileObject);
    } catch (error) {
      if (error.response.status) {
        logger.error(
          "Error recieved from DG ::" +
            error.response.status +
            "::" +
            JSON.stringify(error.response.data)
        );
      }
    }
  }
  public async getSharePointFiles(
    req: Request,
    res: Response
  ): Promise<UploadFileDTO[]> {
    try {
      const sharePontFolder = req.body.directoryName || config.SP_Folder;

      return await this.sharePointsHelper.getFiles(res, sharePontFolder);
    } catch (error) {
      if (error.response.status) {
        logger.error(
          "Error recieved from DG ::" +
            error.response.status +
            "::" +
            JSON.stringify(error.response.data)
        );
      }
    }
  }
}
