import express from "express";
import { getLogger } from "@/utils/loggers";
import validateToken from "@/auth/validateToken";

const router = express.Router();
const logger = getLogger("PRIVATE_ROUTE");

router.get("/", validateToken, (req, res, next) => {
  res.send({ email: (req as any).user.email });
});

export default router;
