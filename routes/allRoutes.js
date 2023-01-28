const userRoute = require('./userRouter')
exports.route = (app) =>{
    app.use('/api/v1/user', userRoute);
}