
enum ResultState {
    OK,
    VALIDATE,
    ERROR,
}

interface Validations {
    [key: string]: string
}

interface Errors {
    [key: string]: string
}

export interface Message<T> {
    status: ResultState,
    validations: Validations,
    errors: Errors,
    data: T,
}