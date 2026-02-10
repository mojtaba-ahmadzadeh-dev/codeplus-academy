export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  ACCEPTED: "accepted",
} as const;

export type StatusType = typeof STATUS[keyof typeof STATUS];