export const CHANNEL = {
  ui: 'ui',
  email: 'email',
};

export const channel = Object.values(CHANNEL);

export const NOTIFICATION_TYPE = {
  'leave-balance-reminder': { ui: CHANNEL.ui },
  'monthly-payslip': { email: CHANNEL.email },
  'happy-birthday': { email: CHANNEL.email, ui: CHANNEL.ui },
};

export const notificationType = ['leave-balance-reminder', 'monthly-payslip', 'happy-birthday'];
