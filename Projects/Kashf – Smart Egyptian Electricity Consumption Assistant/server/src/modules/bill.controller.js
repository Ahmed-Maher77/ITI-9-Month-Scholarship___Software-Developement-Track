import asyncHandler from "../middlewares/asyncHandler.js";
import Bill from "../../database/models/bill.model.js";
import AppError from "../utils/AppError.js";

// @desc    Get all bills for logged in user (with pagination and filtering)
// @route   GET /api/bills
// @access  Private
export const getBills = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, year } = req.query;

    let query = { user: req.user.id };

    if (status && status !== 'all') {
        query.status = status;
    }

    if (year && year !== 'all') {
        // Find bills with date in the selected year
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31T23:59:59`);
        query.dueDate = { $gte: startDate, $lte: endDate };
    }

    const totalBills = await Bill.countDocuments(query);
    const bills = await Bill.find(query)
        .populate("meter")
        .sort({ dueDate: -1 })
        .skip(skip)
        .limit(limit);

    // Transform _id to id for frontend compatibility
    const formattedBills = bills.map(bill => {
        const b = bill.toObject();
        b.id = b.billId || b._id.toString(); // Use custom INV- id or fallback to _id
        if (b.meter && b.meter._id) {
            b.meter.id = b.meter._id.toString();
        }
        delete b.__v;
        return b;
    });

    res.json({
        bills: formattedBills,
        currentPage: page,
        totalPages: Math.ceil(totalBills / limit),
        totalBills
    });
});

// @desc    Add a new bill
// @route   POST /api/bills
// @access  Private
export const addBill = asyncHandler(async (req, res) => {
    const { month, consumption, tier, amount, status, dueDate, meter } = req.body;

    const bill = await Bill.create({
        user: req.user.id,
        meter: meter || undefined,
        month,
        consumption,
        tier,
        amount,
        status: status || 'pending',
        dueDate: dueDate || new Date()
    });

    const b = bill.toObject();
    b.id = b.billId;
    delete b.__v;

    res.status(201).json(b);
});

// @desc    Delete a bill
// @route   DELETE /api/bills/:id
// @access  Private
export const deleteBill = asyncHandler(async (req, res) => {
    const query = { user: req.user.id };
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or = [{ _id: req.params.id }, { billId: req.params.id }];
    } else {
        query.billId = req.params.id;
    }
    const bill = await Bill.findOne(query);

    if (!bill) {
        throw new AppError("Bill not found", 404);
    }

    await bill.deleteOne();
    res.json({ message: "Bill removed" });
});

// @desc    Update a bill
// @route   PUT /api/bills/:id
// @access  Private
export const updateBill = asyncHandler(async (req, res) => {
    const { month, consumption, tier, amount, status, dueDate, meter } = req.body;

    const query = { user: req.user.id };
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or = [{ _id: req.params.id }, { billId: req.params.id }];
    } else {
        query.billId = req.params.id;
    }
    const bill = await Bill.findOne(query);

    if (!bill) {
        throw new AppError("Bill not found", 404);
    }

    bill.month = month || bill.month;
    bill.consumption = consumption !== undefined ? consumption : bill.consumption;
    bill.tier = tier !== undefined ? tier : bill.tier;
    bill.amount = amount !== undefined ? amount : bill.amount;
    bill.status = status || bill.status;
    bill.dueDate = dueDate || bill.dueDate;
    if (meter !== undefined) {
        bill.meter = meter || null;
    }

    const updatedBill = await bill.save();
    
    const b = updatedBill.toObject();
    b.id = b.billId || b._id.toString();
    delete b.__v;

    res.json(b);
});
