// src/constant/status.constant.ts

export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending", 
} as const;

export type StatusType = typeof STATUS[keyof typeof STATUS];