import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export function authMiddleware(request: NextRequest) {
    const token = request.cookies.get('zftoken')?.value;

    if (!token) {
        return { status: 401, json: { message: "Unauthorized" } };
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY || '');
        return { status: 200, user: decoded };
    } catch (error) {
        return { status: 500, message: 'Failed to authenticate token' };
    }
}