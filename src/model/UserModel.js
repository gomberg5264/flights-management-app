
export default class UserModel {
    #user; //private property
    constructor(parseUser){
        this.id = parseUser.id;
        this.username = parseUser.get("username");
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.#user = parseUser;
    }
}