import User from "../schema/user.schema.js";

// Simple controller
const registerUsers_simple = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(404).json({ message: "User not found" })
        }
        await User.create({ email, password })
        return res.status(202).json({ message: "User created" })
    }
    // If error will add ref
    catch (error) {
        return res.status(410).json({ error })
    }
}

// Api Response Class
class ApiResponse {
    constructor(statusCode, message = "Success", data = null) {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

// Controller with success ApiResponse
const registerUsers_ApiResponse = async (req, res) => {
    try {
        const { email, password } = req.body;

        await User.create({ email, password })
        return res.status(201).json(
            new ApiResponse(201, "User created successfully")
        )
    }
    catch (error) {
        return res.status(410).json({ error })
    }
}

// Async Handler with Promise/catch
const asyncHandler_withPromise = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch(next)
    }
}


// Async Handler with try/catch
const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

// First
const registerUsers = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        // es mein koi error array nei hy
        throw new ApiError(491, "Email is required")
        // es mein empty error array hy 
        throw new ApiError(491, "Email is required", [])
        // es mein error array mein two fields a rhe hein
        throw new ApiError(491, "Email is required", [
            { field: "Email" },
            { field: "Passwrod" }
        ])
    }
    await User.create({ email }) // Duplicate error a skta hy
    return res.status(201).json({ message: "User created" })
}
)
// Second
class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = []) {
        super(message)
        this.success = false;
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
// Third
const errorHandler = (err, req, res, next) => {

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            // Agr errors array empty nei hy 
            // to errors fields response mein add kro
            ...(
                err.errors?.length > 0 && {
                    errors: err.errors
                }
            )
        })
    }
    // Agr error ApiError ky ilawa ho to ya response send kro
    console.log("My ERROR:", err);
    return res.status(500).json({
        success: false,
        error: err.message
    });
};


export {
    registerUsers,
    errorHandler,
    registerUser
}
