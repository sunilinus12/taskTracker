const statusOptions = [
  { value: 'pending', label: 'Pending', icon: '🅾️' },
  { value: 'completed', label: 'Completed', icon: '✅' },
  { value: 'overdue', label: 'Overdue', icon: '⚠️' },
];

const priorityOptions = [
  {
    value: 'high',
    label: 'High Priority',
    description: 'Urgent tasks that need immediate attention',
  },
  {
    value: 'medium',
    label: 'Medium Priority',
    description: 'Important tasks with moderate timeline',
  },
  {
    value: 'low',
    label: 'Low Priority',
    description: 'Tasks that can be completed when time allows',
  },
];

export { statusOptions, priorityOptions, };
