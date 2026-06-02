import { Router, type IRouter } from "express";
import { SubmitSurveyBody } from "@workspace/api-zod";
import { db, surveyResponsesTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/survey", async (req, res) => {
  const parsed = SubmitSurveyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const [row] = await db
    .insert(surveyResponsesTable)
    .values(parsed.data)
    .returning();
  res.json({
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    grade: row.grade,
    city: row.city,
    school: row.school,
    createdAt: row.createdAt.toISOString(),
  });
});

router.get("/admin/responses", async (req, res) => {
  const provided = String(req.query.password ?? "");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || provided !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const rows = await db
    .select()
    .from(surveyResponsesTable)
    .orderBy(desc(surveyResponsesTable.createdAt));
  res.json(
    rows.map((row) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      grade: row.grade,
      city: row.city,
      school: row.school,
      createdAt: row.createdAt.toISOString(),
    })),
  );
});

export default router;
