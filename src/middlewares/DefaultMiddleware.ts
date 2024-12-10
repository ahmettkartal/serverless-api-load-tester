import { Request, Response, NextFunction } from "express";

const defaultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.app.set("per_page", (req.query.per_page ? parseInt(req.query.per_page as string): parseInt(process.env.DEFAULT_RESPONSE_PER_PAGE as string)));
    req.app.set("page", (req.query.page ? parseInt(req.query.page as string): parseInt(process.env.DEFAULT_RESPONSE_PAGE as string)));
    req.app.set("is_debug", req.query.is_debug === "true");
    req.app.set("list_all", req.query.list_all === "true");

    // Allow all cors for local development
    if (process.env.PROJECT_APP_STAGE === 'LOCAL' || process.env.PROJECT_APP_STAGE === 'DEVELOPMENT') {
        console.log("Local Development: Allowing CORS");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    }
    next();
}

export default defaultMiddleware;