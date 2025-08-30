const settings = {
    parentURL: "http://solutions.pscu.net/OurSolutions/_api/web/lists/?$select=",
    chieldURL: "https://uspofedcourts.sharepoint.us/sites/PACTS360-DEV-TEST",

    preURL: "http://solutions.pscu.net/OurSolutions/_api/web/lists/getbytitle",
    postURL: "/Files",
    baseURL: "http://solutions.pscu.net/OurSolutions",

    filterQuesry:
      "DocumentTemplateUrl,RootFolder,Items,ItemCount,ContentTypes,Title",
  };
  
  exports.settings = settings;