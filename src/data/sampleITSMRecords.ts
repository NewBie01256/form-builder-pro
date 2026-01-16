export interface ITSMRecord {
  id: string;
  name: string;
  description: string;
  category: 'Incident' | 'Service Request' | 'Change' | 'Problem';
  status: 'Draft' | 'Active' | 'Archived';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  createdAt: string;
  updatedAt: string;
  questionCount: number;
  serviceCatalog: string;
}

export const sampleITSMRecords: ITSMRecord[] = [
  {
    id: 'itsm-001',
    name: 'Hardware Issue Triage',
    description: 'Questionnaire for diagnosing hardware-related incidents',
    category: 'Incident',
    status: 'Active',
    priority: 'High',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    questionCount: 12,
    serviceCatalog: 'IT Support'
  },
  {
    id: 'itsm-002',
    name: 'New Employee Onboarding',
    description: 'Service request form for new employee IT setup',
    category: 'Service Request',
    status: 'Active',
    priority: 'Medium',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    questionCount: 18,
    serviceCatalog: 'HR Services'
  },
  {
    id: 'itsm-003',
    name: 'Software Installation Request',
    description: 'Request form for new software installation approval',
    category: 'Service Request',
    status: 'Active',
    priority: 'Low',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12',
    questionCount: 8,
    serviceCatalog: 'IT Support'
  },
  {
    id: 'itsm-004',
    name: 'Network Outage Assessment',
    description: 'Critical incident questionnaire for network issues',
    category: 'Incident',
    status: 'Active',
    priority: 'Critical',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22',
    questionCount: 15,
    serviceCatalog: 'Network Services'
  },
  {
    id: 'itsm-005',
    name: 'Password Reset Workflow',
    description: 'Self-service password reset verification',
    category: 'Service Request',
    status: 'Active',
    priority: 'Medium',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-15',
    questionCount: 5,
    serviceCatalog: 'Security'
  },
  {
    id: 'itsm-006',
    name: 'Infrastructure Change Request',
    description: 'Change management form for infrastructure modifications',
    category: 'Change',
    status: 'Draft',
    priority: 'High',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-21',
    questionCount: 22,
    serviceCatalog: 'Infrastructure'
  },
  {
    id: 'itsm-007',
    name: 'Recurring Issue Analysis',
    description: 'Problem management questionnaire for root cause analysis',
    category: 'Problem',
    status: 'Active',
    priority: 'Medium',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19',
    questionCount: 10,
    serviceCatalog: 'IT Support'
  },
  {
    id: 'itsm-008',
    name: 'VPN Access Request',
    description: 'Remote access VPN setup and verification',
    category: 'Service Request',
    status: 'Archived',
    priority: 'Low',
    createdAt: '2023-12-15',
    updatedAt: '2024-01-02',
    questionCount: 7,
    serviceCatalog: 'Security'
  }
];
