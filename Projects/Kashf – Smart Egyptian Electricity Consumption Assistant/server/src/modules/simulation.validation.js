import Joi from "joi";

const deviceFields = {
  name: Joi.string().trim().min(1).max(100),
  wattage: Joi.number().min(1).max(100000),
  isOn: Joi.boolean(),
  essential: Joi.boolean(),
};

export const createSimulationSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200).default("New Simulation"),
  autoGenerate: Joi.boolean().default(false),
});

export const addCircuitSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  autoGenerate: Joi.boolean().default(false),
});

export const addDeviceSchema = Joi.object({
  circuitId: Joi.string().required(),
  name: Joi.string().trim().min(1).max(100).required(),
  wattage: Joi.number().min(1).max(100000).required(),
});

export const updateDeviceSchema = Joi.object({
  ...deviceFields,
}).min(1);

export const updateCircuitSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100),
}).min(1);

export const whatIfSchema = Joi.object({
  toggleDevices: Joi.array().items(
    Joi.object({
      deviceId: Joi.string().required(),
      isOn: Joi.boolean().required(),
    })
  ).min(1).required(),
  durationMinutes: Joi.number().min(1).max(525600).default(60),
});

export const chatSchema = Joi.object({
  message: Joi.string().trim().min(1).max(500).required(),
  messageId: Joi.string().trim().max(100).optional(),
});

export const startAutoPilotSchema = Joi.object({
  monthlyKwhLimit: Joi.number().min(1).max(100000),
  targetBillEgp: Joi.number().min(1).max(100000),
}).min(1);
