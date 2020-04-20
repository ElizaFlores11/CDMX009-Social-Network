export default class User {
    
    name
    lastName
    email
    password
    decription
    photo
    constructor(name,lastName,email,password,decription,photo){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.decription = decription; 
        this.photo = photo; 
    }
}