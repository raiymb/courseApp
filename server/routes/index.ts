import { Router } from "express";
import courseRouter from "./courseRoutes";
import userRouter from "./userRoutes";
import enrollmentRouter from "./enrollmentRoutes";
import lessonRouter from "./lessonRoutes";
import materialRouter from "./materialRoutes";
import paymentRouter from "./paymentRoutes";
import quizRouter from "./quizRoutes";
import questionRouter from "./questionRoutes";
import authRouter from "./authRoutes";
import adminRouter from "./adminRoutes";

const router = Router();

router.use(courseRouter);
router.use(userRouter);
router.use(enrollmentRouter);
router.use(lessonRouter);
router.use(materialRouter);
router.use(paymentRouter);
router.use(quizRouter);
router.use(questionRouter);
router.use(authRouter);
router.use(adminRouter);

export default router;