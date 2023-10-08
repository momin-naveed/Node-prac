const { object, string, date, ref } = require('yup');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const signUpSchema = object({
  body: object({
    firstName: string().required('FirstName must be required').min(4),
    lastName: string().required('LastName must be required').min(4),
    email: string()
      .required('Email must required....')
      .matches(emailRegex, 'Email include like example123@example.com'),
    password: string()
      .required('Password include atleast 1 Upper&Lowercase and number')
      .matches(
        passwordRegex,
        'Password must have Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirmPassword: string()
      .required('Password include atleast 1 Upper&Lowercase and number')
      .matches(
        passwordRegex,
        'Password must have Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character'
      )
      .oneOf([ref('password'), null], 'password must be match'),
    createdOn: date().default(() => new Date()),
  }),
});

const signInSchema = object({
  body: object({
    email: string()
      .required('Email must required....')
      .matches(emailRegex, 'Email include like example123@example.com'),
    password: string()
      .required('Password include atleast 1 Upper&Lowercase and number')
      .matches(
        passwordRegex,
        'Password must have Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character'
      ),
  }),
});

module.exports = { signInSchema, signUpSchema };
