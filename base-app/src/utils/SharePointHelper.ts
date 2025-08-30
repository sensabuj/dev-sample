import * as spauth from "node-sp-auth";
import * as request from "request-promise";
import { injectable } from "tsyringe";
import config from "@config/endpoints.config";
import { settings } from "@config/links";
import { UploadFileDTO } from "@models/uploadFile.model";
import path from "path";
import fs from "fs";
import oracledb from "oracledb";
import { Download } from "sp-download";
const fsPromises = fs.promises;
@injectable()
export class SharePointsHelper {
  private readonly magnoliaAuthorUrl = process.env.MAGNOLIAAUTHORURL;
  /**
   *
   */

  constructor() { }
  // authentication
  auth = async () => {
    return await spauth.getAuth("http://solutions.pscu.net/", {
      username: "FLesSud@pscu.com",
      password: "Hjkj1188!!",
      domain: "sp",
    });
  };

  public async saveDBObject(fileObject) {
    try {
      let fObject = <UploadFileDTO>fileObject;

      const documentExtension = fObject.fileType;
      let documentName = fObject.fileName;
      const documentSize = fObject.fileSize;
      const documentTag =   fObject.fileTag;
      ;

      //console.log({ fObject });

      console.log("{ fObject1 }");
      oracledb.getConnection(
        {
          user: "SYSTEM",
          password: "Hjkj1177!!",
          /*  connectString : 'localhost/pscu' */
          connectString:
            "(DESCRIPTION =  (ADDRESS_LIST =  (ADDRESS = (PROTOCOL = TCP)(HOST =localhost)(PORT = 1521)) )  (CONNECT_DATA =   (SID= XE)) )",

        },


        /*   (DESCRIPTION =
            (ADDRESS_LIST =
              (ADDRESS = (PROTOCOL = TCP)(HOST =phdocloud-scan.pscu.net.test)(PORT = 15210))
            )
            (CONNECT_DATA =
              (SERVICE_NAME= mc.dev.001)
            )
          ) */
        async function (err, connection) {
          if (err) {
            console.error("fff", err.message);
            return;
          }
          console.log("{ fObject }");

          const result = await connection.execute(
            "INSERT INTO BC_FILE_INFO (FILENAME, FILEEXTENTION, FILESIZE, FILETYPE,TAG)" +
            " VALUES " +
            "(:0, :1, :2, :3, :4)",
            [documentName,documentExtension, documentSize, 'SHAREPONT', documentTag],
            { autoCommit: true });

            const MAX = await connection.execute(
              "select MAX(ID) AS M from BC_FILE_INFO"              
              );
              let t=MAX.rows[0]
              console.log("{ MAX }",MAX.rows[0]);

              console.log("{ t }",parseInt( t));

 
            const result1 = await connection.execute(
              "INSERT INTO BC_FILE_CONTENT (FILEID, FILECONTENT)" +
              " VALUES " +
              "(:0, :1)",
              [ parseInt( t), fObject.fileContent],
              { autoCommit: true });


          connection.execute(
            "select MAX(ID) from BC_FILE_CONTENT",
            [],
            function (err, result) {
              if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
              }
              console.log(result.metaData);
              console.log(result.rows);
              doRelease(connection);
            }
          );



        }
      );
      function doRelease(connection) {
        connection.release(function (err) {
          if (err) {
            console.error(err.message);
          }
        });
      }
    } catch (err) { }
  }
  private async uploadFile(localFilePath, fileName) {
    try {
      const uploadPath = "pscu";
      let stat = fs.statSync(localFilePath);
      console.log("sending file, size %d", stat.size);

      let buff = fs.readFileSync(localFilePath);
      let base64data = buff.toString("base64");

      const documentExtension = path.extname(fileName).substring(1);
      let documentName = path.basename(localFilePath, documentExtension);
      documentName = documentName.substring(0, documentName.length - 1);

      const documentHeight = 100;
      const documentWidth = 100;
      const documentSize = stat.size;

      let fileContent = JSON.stringify({
        name: "jcr:content",
        type: "mgnl:resource",
        path:
          "/" +
          uploadPath +
          "/" +
          documentName +
          "." +
          documentExtension +
          "/" +
          "jcr:content",
        properties: [
          {
            name: "jcr:data",
            type: "Binary",
            multiple: false,
            values: [base64data],
          },
          {
            name: "height",
            type: "Long",
            multiple: false,
            values: [documentHeight],
          },
          {
            name: "width",
            type: "Long",
            multiple: false,
            values: [documentWidth],
          },
          {
            name: "size",
            type: "Long",
            multiple: false,
            values: [documentSize],
          },
          {
            name: "extension",
            type: "String",
            multiple: false,
            values: [documentExtension],
          },
          {
            name: "fileName",
            type: "String",
            multiple: false,
            values: [documentName + "." + documentExtension],
          },
          {
            name: "jcr:mimeType",
            type: "String",
            multiple: false,
            values: ["image/png"],
          },
        ],
      });

      fetch(this.magnoliaAuthorUrl + ".rest/nodes/v1/dam/" + uploadPath, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic: " + Buffer.from("superuser:superuser").toString("base64"),
        },
        body: JSON.stringify({
          name: documentName + "." + documentExtension,
          path: "/" + uploadPath + "/" + documentName + "." + documentExtension,
          type: "mgnl:asset",
          properties: [
            {
              name: "type",
              type: "String",
              multiple: false,
              values: [documentExtension],
            },
            {
              name: "name",
              type: "String",
              multiple: false,
              values: [documentName],
            },
          ],
        }),
      }).then((response) => {
        if (response.status == 200) {
          fetch(
            this.magnoliaAuthorUrl +
            ".rest/nodes/v1/dam/" +
            uploadPath +
            "/" +
            documentName +
            "." +
            documentExtension,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Basic: " +
                  Buffer.from("superuser:superuser").toString("base64"),
              },
              body: fileContent,
            }
          ).then((response) => {
            if (response.status == 200) {
              /* res.status(200).send({
                message: `File uploaded successfully.`,
              }); */
            } else {
              /*   res.status(response.status).send({
                message: `Could not upload the file: ${response.error}`,
              }); */
            }
          });
        } else {
          /*  res.status(response.status).send({
            message: `Could not upload the file: ${response.error}`,
          }); */
        }
      });
    } catch (error) {
      console.log("ERROR");
      /*    res.status(500).send({
        message: `Could not upload the file: ${error}`,
      }); */
    }
  }
  public urlToToSharingToken(url) {
    var trimEnd = function (str, c) {
      c = c ? c : " ";
      var i = str.length - 1;
      for (; i >= 0 && str.charAt(i) == c; i--);
      return str.substring(0, i + 1);
    };
    var value = Buffer.from(url).toString("base64");
    return "u!" + trimEnd(value, "=").replace(/\//g, "_").replace(/\+/g, "-");
  }
  public async getFiles(
    res,
    baseFolder: String,
    subFolder: string = null
  ): Promise<UploadFileDTO[]> {
    try {
      /*  let data = await this.auth();
 
       let headers = data.headers;
       headers["Accept"] = "application/json;odata=verbose";
       let requestOpts = data.options;
       requestOpts.json = true;
       requestOpts.headers = headers;
 
       requestOpts.url = `${settings.preURL}('${baseFolder}')${settings.postURL}`;
 
       let responseList = await request.get(requestOpts); */



      const directoryPath = path.join(
        __dirname,
        "..",
        config.DownPath,
        "Documents"
      );
      console.log("directoryPath===", directoryPath);
      //passsing directoryPath and callback function
      const downloadFiles = await fsPromises.readdir(directoryPath);


      //listing all files using forEach
      /*   files.forEach(function (file) */
      /*   for (let fileName of files) {
          // Do whatever you want to do with the file
          console.log(fileName);
          const localFilePath = path.resolve(directoryPath, fileName);
         await this.uploadFile(localFilePath, fileName);
          //  await this.saveDBObject(localFilePath, fileName);
        } */

      // let downloadFiles = responseList.d.results;

      let uploadFileDTO = [];
      //console.log("downloadFiles", downloadFiles);
      let i = 0;
      for (let itm of downloadFiles) {
        // downloadFiles.forEach((itm, i) => {
        // if (itm.__metadata.type === "MS.FileServices.File") {
        //console.log("element", itm.Url);
        let documentFullPath = path.resolve(directoryPath, itm);
        console.log("itm===", { itm });
        console.log("documentFullPath===", { documentFullPath });
        const documentSize = 100;
        let onj = itm;
        const subStringLength = `'${settings.baseURL}/${baseFolder}/'`;
        let documentPath = documentFullPath.substring(subStringLength.length - 2); //

        //get all files
        let rootFolderName;
        if (documentPath.length > 0) {
          const folders = documentPath.split("/");
          rootFolderName = folders[0];
          const documentExtension = path
            .extname(documentFullPath)
            .substring(1);
          let documentName = path.basename(documentFullPath);

          const documentPathLength = documentPath.length + 1;
          const documentNameLength = documentName.length;

          let tagBase = documentPath.substring(
            0,
            documentPathLength - documentNameLength - 2
          );

          //set Tag
          tagBase = tagBase.toLowerCase();
          tagBase = tagBase.replace(/ /g, "_");
          const searchRegExp = /\//g;
          const replaceWith = " > ";
          tagBase = tagBase.replace(searchRegExp, replaceWith);

          //  return;
          const subFolder = "Compromise Alerts Project"; //"Primax Connect Content Migration";// "Compromise Alerts Project"; // "Monetary Field Expansion";
          // if (rootFolderName.toLowerCase() == subFolder.toLowerCase()) {

          try {
            /* const saveToPath = path.join(
              __dirname,
              "../..",
              config.DownPath
            );
            const download = new Download({
              username: "FLesSud@pscu.com",
              password: "Hjkj1188!!",
              domain: "sp",
            });

            await download.downloadFile(documentFullPath, saveToPath); */


            //set base64
            /*  const saveToPathForByteCode = path.join(
               saveToPath,
               documentName
             ); */
            //  console.log("directoryPath", saveToPathForByteCode);
            let buff = fs.readFileSync(documentFullPath);
            let base64data = buff.toString("base64");
            // console.log("base64data", base64data);

            uploadFileDTO.push({
              requestFrom: "SHAREPOINT",
              fileName: documentName,
              fileContent: base64data,
              fileTag: tagBase,
              fileSize: documentSize,
              fileType: documentExtension,
            });
            // delete file after byte convert
            //fs.unlinkSync(saveToPathForByteCode);
          } catch (err) {
            console.log(err);
          }
          i++;


          //}
        }
        // }
      }

      return uploadFileDTO;
    } catch (err) {
      return;
    }
  }
}
