import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import projectsRouter from "./projects";
import experiencesRouter from "./experiences";
import profileRouter from "./profile";
import messagesRouter from "./messages";
import uploadRouter from "./upload";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(projectsRouter);
router.use(experiencesRouter);
router.use(profileRouter);
router.use(messagesRouter);
router.use(uploadRouter);
router.use(authRouter);

export default router;
