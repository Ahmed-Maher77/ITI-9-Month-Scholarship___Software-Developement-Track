import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  wattage: { type: Number, required: true, min: 1 },
  isOn: { type: Boolean, default: false },
  essential: { type: Boolean, default: false },
}, { _id: true });

const circuitSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  devices: [deviceSchema],
}, { _id: true });

const simulationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  name: {
    type: String,
    default: "New Simulation",
    trim: true,
  },
  circuits: [circuitSchema],
  consumptionGoal: {
    monthlyKwhLimit: { type: Number, default: null, min: 1 },
    targetBillEgp: { type: Number, default: null, min: 1 },
  },
  autoPilot: {
    enabled: { type: Boolean, default: false },
    startedAt: { type: Date, default: null },
    actionsTaken: { type: Number, default: 0 },
  },
}, { timestamps: true });

const Simulation = mongoose.model("Simulation", simulationSchema);

export default Simulation;
