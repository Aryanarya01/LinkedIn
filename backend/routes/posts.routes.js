import { Router } from "express";
import { activeCheck } from "../controllers/posts.controller";

const route = Router();


route.route('/').get(activeCheck)