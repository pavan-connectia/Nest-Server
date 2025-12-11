import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided", error: true });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = decoded.userId;

    next();

  } catch (error:any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", error: true });
    }

    return res.status(401).json({ message: "Invalid token", error: true });
  }
};
