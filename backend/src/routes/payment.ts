// Payment tracking routes for manual payment management
import express from "express";
import { AuthRequest } from "../middleware/authenticate";
import { pool } from "../db";

const router = express.Router();

// TODO: Add proper admin authentication middleware
// For now, we'll note that this should be protected in production

// GET /api/payment/users/:userId - Get payment info for a specific user
router.get("/users/:userId", async (req: AuthRequest, res: any) => {
  try {
    const userId = req.params.userId;

    // Validate UUID format (simplified check)
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidPattern.test(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Optional: Verify that the requesting user is authorized to view this data
    // For now, we'll allow any authenticated user to view payment info
    // In production, this should be restricted to admins only

    const { rows } = await pool.query(
      `SELECT id, email, trial_start_date, trial_end_date, is_trial, plan_type, actual_plan,
              paid_until, last_manual_payment_date, last_payment_amount, payment_notes, lifetime_value,
              CASE
                  WHEN is_trial AND trial_end_date >= NOW() THEN TRUE
                  WHEN paid_until >= NOW() THEN TRUE
                  ELSE FALSE
              END as has_active_access
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    res.json({ user });
  } catch (err) {
    console.error("Error fetching user payment info:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/payment/users/:userId/mark-paid - Mark a user as paid for a specified duration
router.post("/users/:userId/mark-paid", async (req: AuthRequest, res: any) => {
  try {
    const userId = req.params.userId;
    const { months, amount, notes } = req.body;

    // Validate UUID format (simplified check)
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidPattern.test(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Validate input
    const durationInMonths = months && !isNaN(months) ? parseInt(months, 10) : 1;
    if (durationInMonths < 1 || durationInMonths > 24) {
      return res.status(400).json({ message: "Months must be between 1 and 24" });
    }

    const paymentAmount = amount && !isNaN(amount) ? parseFloat(amount) : 450; // Default to Growth plan price
    if (paymentAmount <= 0) {
      return res.status(400).json({ message: "Payment amount must be positive" });
    }

    // Optional: Verify that the requesting user is authorized to mark payments
    // For now, we'll allow any authenticated user to mark payments
    // In production, this should be restricted to admins only

    // Get current user info to check existing paid_until
    const { rows: currentRows } = await pool.query(
      `SELECT paid_until FROM users WHERE id = $1`,
      [userId]
    );

    if (currentRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentPaidUntil = currentRows[0].paid_until ? new Date(currentRows[0].paid_until) : null;
    const now = new Date();

    // Calculate paid until date (from now or from current paid_until if it's in the future)
    const startDate = (currentPaidUntil && currentPaidUntil > now) ? currentPaidUntil : now;
    const paidUntil = new Date(startDate.getTime() + (durationInMonths * 30 * 24 * 60 * 60 * 1000)); // Approximate months

    // Update user payment information
    const { rows } = await pool.query(
      `UPDATE users
       SET
         paid_until = $1,
         last_manual_payment_date = $2,
         last_payment_amount = $3,
         payment_notes = COALESCE($4, payment_notes),
         lifetime_value = lifetime_value + $5,
         updated_at = NOW()
       WHERE id = $6
       RETURNING id, email, paid_until, last_manual_payment_date, last_payment_amount`,
      [paidUntil, now, paymentAmount, notes || null, paymentAmount, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = rows[0];

    res.json({
      message: `User marked as paid for ${durationInMonths} month(s)`,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        paidUntil: updatedUser.paid_until,
        lastPaymentDate: updatedUser.last_manual_payment_date,
        lastPaymentAmount: updatedUser.last_payment_amount
      }
    });
  } catch (err) {
    console.error("Error marking user as paid:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/payment/users/:userId/extend-paid - Extend existing paid period
router.post("/users/:userId/extend-paid", async (req: AuthRequest, res: any) => {
  try {
    const userId = req.params.userId;
    const { months, amount, notes } = req.body;

    // Validate UUID format (simplified check)
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidPattern.test(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Validate input
    const durationInMonths = months && !isNaN(months) ? parseInt(months, 10) : 1;
    if (durationInMonths < 1 || durationInMonths > 24) {
      return res.status(400).json({ message: "Months must be between 1 and 24" });
    }

    const paymentAmount = amount && !isNaN(amount) ? parseFloat(amount) : 450; // Default to Growth plan price
    if (paymentAmount <= 0) {
      return res.status(400).json({ message: "Payment amount must be positive" });
    }

    // Optional: Verify that the requesting user is authorized to extend payments
    // For now, we'll allow any authenticated user to extend payments
    // In production, this should be restricted to admins only

    // Get current user info to check existing paid_until
    const { rows: currentRows } = await pool.query(
      `SELECT paid_until FROM users WHERE id = $1`,
      [userId]
    );

    if (currentRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentPaidUntil = currentRows[0].paid_until ? new Date(currentRows[0].paid_until) : null;
    const now = new Date();

    // Calculate new paid until date
    // If currently paid, extend from the current paid_until date
    // If not currently paid or paid period expired, start from now
    const startDate = (currentPaidUntil && currentPaidUntil > now) ? currentPaidUntil : now;
    const paidUntil = new Date(startDate.getTime() + (durationInMonths * 30 * 24 * 60 * 60 * 1000)); // Approximate months

    // Update user payment information
    const { rows } = await pool.query(
      `UPDATE users
       SET
         paid_until = $1,
         last_manual_payment_date = $2,
         last_payment_amount = $3,
         payment_notes = COALESCE($4, payment_notes),
         lifetime_value = lifetime_value + $5,
         updated_at = NOW()
       WHERE id = $6
       RETURNING id, email, paid_until, last_manual_payment_date, last_payment_amount`,
      [paidUntil, now, paymentAmount, notes || null, paymentAmount, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = rows[0];

    res.json({
      message: `Paid period extended by ${durationInMonths} month(s)`,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        paidUntil: updatedUser.paid_until,
        lastPaymentDate: updatedUser.last_manual_payment_date,
        lastPaymentAmount: updatedUser.last_payment_amount
      }
    });
  } catch (err) {
    console.error("Error extending user paid period:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/payment/overview - Get overview of all users' payment status
router.get("/overview", async (req: AuthRequest, res: any) => {
  try {
    // Optional: Verify that the requesting user is authorized to view overview
    // For now, we'll allow any authenticated user to view overview
    // In production, this should be restricted to admins only

    const { rows } = await pool.query(
      `SELECT id, email, trial_start_date, trial_end_date, is_trial, plan_type, actual_plan,
              paid_until, last_manual_payment_date, last_payment_amount, lifetime_value,
              CASE
                  WHEN is_trial AND trial_end_date >= NOW() THEN 'trial'
                  WHEN paid_until >= NOW() THEN 'paid'
                  ELSE 'expired'
              END as status
       FROM users
       ORDER BY
         CASE
           WHEN is_trial AND trial_end_date >= NOW() THEN 1
           WHEN paid_until >= NOW() THEN 2
           ELSE 3
         END,
         paid_until DESC NULLS LAST`
    );

    // Format dates for better readability in response
    const formattedRows = rows.map(user => ({
      ...user,
      trial_start_date: user.trial_start_date ? new Date(user.trial_start_date).toISOString() : null,
      trial_end_date: user.trial_end_date ? new Date(user.trial_end_date).toISOString() : null,
      paid_until: user.paid_until ? new Date(user.paid_until).toISOString() : null,
      last_manual_payment_date: user.last_manual_payment_date ? new Date(user.last_manual_payment_date).toISOString() : null
    }));

    res.json({ users: formattedRows });
  } catch (err) {
    console.error("Error fetching payment overview:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;