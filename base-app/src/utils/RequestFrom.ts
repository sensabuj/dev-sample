class RequestFrom {
  // Create new instances of the same class as static attributes
  public static ui = new RequestFrom("UI");
  public static sharepoint = new RequestFrom("SHAREPOINT");

  public name;
  constructor(name) {
    this.name = name;
  }
}
export default RequestFrom;
