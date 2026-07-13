import asyncHandler from "../middlewares/asyncHandler.js";
import Meter from "../../database/models/meter.model.js";
import User from "../../database/models/user.model.js";
import Bill from "../../database/models/bill.model.js";
import AppError from "../utils/AppError.js";

// @desc    Get all meters for logged in user
// @route   GET /api/meters
// @access  Private
export const getMeters = asyncHandler(async (req, res) => {
    const meters = await Meter.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    const formattedMeters = [];
    for (const meter of meters) {
        const m = meter.toObject();
        m.id = m._id.toString();
        delete m._id;
        delete m.__v;

        // Find bills linked to this meter
        const bills = await Bill.find({ user: req.user.id, meter: meter._id }).sort({ dueDate: 1 });

        if (bills.length > 0) {
            // Use real data from bills
            const latestBill = bills[bills.length - 1];
            m.consumption = latestBill.consumption;
            m.tier = latestBill.tier;
            m.lastReading = latestBill.dueDate;
            m.trend = bills.map(b => b.consumption);
        } else {
            // Generate realistic mock/simulated data based on meter type/ID
            // so that newly created meters immediately look premium and realistic
            const baseValue = m.type === "commercial" ? 650 : m.type === "vacation" ? 35 : 220;
            const multiplier = m.type === "commercial" ? 1.5 : m.type === "vacation" ? 0.3 : 1.1;

            // Stable deterministic trend based on database id hash
            const seed = parseInt(m.id.substring(18, 24), 16) || 12345;
            const trend = [];
            for (let i = 0; i < 5; i++) {
                const fluctuation = Math.sin(seed + i) * (baseValue * 0.12);
                trend.push(Math.max(10, Math.round(baseValue - 30 + (i * 12 * multiplier) + fluctuation)));
            }

            m.trend = trend;
            m.consumption = trend[trend.length - 1];

            // Determine tier based on consumption
            if (m.consumption <= 50) m.tier = 1;
            else if (m.consumption <= 100) m.tier = 2;
            else if (m.consumption <= 200) m.tier = 3;
            else if (m.consumption <= 350) m.tier = 4;
            else if (m.consumption <= 650) m.tier = 5;
            else if (m.consumption <= 1000) m.tier = 6;
            else m.tier = 7;

            // Use 5 days ago as default reading date
            m.lastReading = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
        }

        formattedMeters.push(m);
    }

    res.json(formattedMeters);
});

// @desc    Create a new meter
// @route   POST /api/meters
// @access  Private
export const createMeter = asyncHandler(async (req, res) => {
    const { name, number, type, status } = req.body;

    if (!name || !number) {
        throw new AppError("Please provide name and number for the meter", 400);
    }

    // Enforce meter limit by plan
    const user = await User.findById(req.user.id);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    const currentPlan = user.subscriptionPlan || "free";
    const meterCount = await Meter.countDocuments({ user: req.user.id });

    const PLAN_LIMITS = {
        free: 1,
        plus: 2,
        family: 5,
    };

    const maxMetersAllowed = PLAN_LIMITS[currentPlan] || 1;

    if (meterCount >= maxMetersAllowed) {
        throw new AppError(`You have reached the maximum number of meters allowed for your plan (${maxMetersAllowed}). Please upgrade your plan to register more meters.`, 400);
    }

    const meterExists = await Meter.findOne({ user: req.user.id, number });

    if (meterExists) {
        throw new AppError("Meter with this number already exists for this user", 400);
    }

    const meter = await Meter.create({
        user: req.user.id,
        name,
        number,
        type: type || "residential",
        status: status || "active",
        trend: [0],
        consumption: 0
    });

    if (meter) {
        const m = meter.toObject();
        m.id = m._id.toString();
        delete m._id;
        delete m.__v;
        res.status(201).json(m);
    } else {
        throw new AppError("Invalid meter data", 400);
    }
});

// @desc    Update a meter
// @route   PUT /api/meters/:id
// @access  Private
export const updateMeter = asyncHandler(async (req, res) => {
    const meter = await Meter.findById(req.params.id);

    if (!meter) {
        throw new AppError("Meter not found", 404);
    }

    // Make sure user owns meter
    if (meter.user.toString() !== req.user.id) {
        throw new AppError("User not authorized", 401);
    }

    const updatedMeter = await Meter.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    const m = updatedMeter.toObject();
    m.id = m._id.toString();
    delete m._id;
    delete m.__v;

    res.json(m);
});

// @desc    Delete a meter
// @route   DELETE /api/meters/:id
// @access  Private
export const deleteMeter = asyncHandler(async (req, res) => {
    const meter = await Meter.findById(req.params.id);

    if (!meter) {
        throw new AppError("Meter not found", 404);
    }

    // Make sure user owns meter
    if (meter.user.toString() !== req.user.id) {
        throw new AppError("User not authorized", 401);
    }

    await meter.deleteOne();

    res.json({ id: req.params.id });
});
