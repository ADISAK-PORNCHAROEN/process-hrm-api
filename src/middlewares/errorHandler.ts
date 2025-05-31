import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // console.error('Global Error Handler:', {
    //     message: error.message,
    //     stack: error.stack,
    //     url: req.url,
    //     method: req.method
    // });

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error',
        data: null,
        ...(process.env.NODE_ENV === 'development' && { 
            stack: error.stack,
            url: req.url,
            method: req.method
        })
    });
};