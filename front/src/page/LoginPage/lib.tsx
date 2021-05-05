export interface LoginData {
    userName: string;
    password: string;
}

export interface SignupData extends LoginData {
    passwordConfirm: string;
}

interface loginFormError {
    userName?: {message?: string};
    password?: {message?: string};
}

interface signupFormError extends loginFormError {
    passwordConfirm?: {message?: string};
}

export interface LoginFormProps {
    signIn: Function;
    showForm: Boolean;
    register: any;
    handleSubmit: Function;
    errors: loginFormError
    setError: Function
}

export interface SignUpFormProps {
    signUp: Function;
    showForm: Boolean;
    register: any;
    handleSubmit: Function;
    setError: Function; 
    errors: signupFormError;
}
