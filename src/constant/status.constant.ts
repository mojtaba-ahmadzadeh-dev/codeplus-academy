export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  ACCEPTED: "accepted",
  PROCESSING: "processing",
  COMPLETED: "completed",
  PAID: "paid",
  UNPAID: "unPaid",
  CANCELLED: "cancelled"
} as const;

export type StatusType = typeof STATUS[keyof typeof STATUS];