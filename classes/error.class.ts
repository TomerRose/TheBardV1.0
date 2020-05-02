export class ErrMissingParameter extends Error {
    status = 400;
    constructor(property: string | string[], message = '') {
        super(message);
        this.message = typeof (property) == 'string' ? property + " missing" : property.join(', ') + " missing"
        this.name = "Missing Parameter Error";
      }
}

export class ErrAlreadyExists extends Error {
    status = 409;
    constructor(message?) {
        super(message);
        this.message = "This userName or Email already exists"
        this.name = "Missing Parameter Error";
      }

}