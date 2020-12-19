
export class LoginRequest 
{
    username: string;
    userPassword: string;

    constructor(username: string  ,  userPassword: string) {
        this.username=username;
        this.userPassword = userPassword;
    }
}
