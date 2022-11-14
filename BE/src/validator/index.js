exports.userSignupValidator = (req,res, next) => {
    req.check('name', 'Name is required').notEmpty()
    req.check('email','Email must be not empty')
    .matches(/.+\@.+\ ..+/)
    .withMessage('Email must contain @')
    .isLength({min:4, max:40})
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
    .isLength({min:6})
    .withMessage("Passwords must have more than 6 characters")
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next()

}