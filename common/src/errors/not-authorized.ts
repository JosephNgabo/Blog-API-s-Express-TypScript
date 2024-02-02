import { CustomError } from "./custom-error";
 export class NotAuthorized extends CustomError{
    statusCode = 401;
    constructor(){
        super('Not authorized!');
    }
    generateErrors(){
        return [{message: 'Not authorized'}]
    }
 }
