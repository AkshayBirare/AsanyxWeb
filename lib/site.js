// ASANYX Analytics - central content configuration (Enterprise IT Consulting)
export const site = {
  name: 'ASANYX Analytics',
  legalName: 'ASANYX Analytics Private Limited',
  tagline: 'Transforming Data into Business Decisions',
  email: 'contact@asanyxanalytics.com',
  phone: '+91 8468982682',
  whatsapp: '918468982682',
  location: 'India',
  logo: 'https://customer-assets-jai6qajn.emergentagent.net/job_80e05dd0-4f9f-485e-b1aa-5d8939ea0cd2/artifacts/bi2y6etn_Screenshot%202026-07-28%20071001.png',
  founderPhoto: 'https://customer-assets-v7afamib.emergentagent.net/job_asanyx-analytics/artifacts/t9pxr1eb_ChatGPT%20Image%20Jul%2028%2C%202026%2C%2001_42_31%20PM.png',
  coFounderPhoto: 'https://customer-assets-v7afamib.emergentagent.net/job_asanyx-analytics/artifacts/vfjff9k7_ChatGPT%20Image%20Jul%2028%2C%202026%2C%2001_02_23%20PM.png',
  linkedin: 'https://www.linkedin.com/company/asanyx-analytics-pvt-ltd/',
  founder: {
    name: 'Akshay Birare',
    designation: 'CEO & Founder',
    linkedin: 'https://www.linkedin.com/in/akshaybirare',
    bio: 'Business Intelligence and Data Analytics leader with extensive experience delivering enterprise BI, analytics and cloud data solutions across Finance, Banking, Logistics, Shipping, Retail and EdTech industries.',
    focus: ['Business Intelligence', 'Microsoft Fabric', 'Power BI', 'Data Engineering', 'Analytics Strategy', 'Cloud Data Platforms', 'Digital Transformation'],
  },
  hours: 'Mon-Fri, 10:00 AM - 7:00 PM IST',
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Engagement Models', href: '/engagement-models' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export const whyAsanyx = [
  { title: 'Enterprise BI Expertise', desc: 'Deep experience delivering enterprise-scale Business Intelligence programs across regulated industries.', icon: 'BarChart3' },
  { title: 'Certified Professionals', desc: 'Microsoft-certified consultants across Power BI, Fabric, Azure Data and modern data platforms.', icon: 'BadgeCheck' },
  { title: 'Agile Delivery', desc: 'Iterative delivery cadence with clear sprint goals, transparent reporting and predictable milestones.', icon: 'Timer' },
  { title: 'Scalable Architecture', desc: 'Architectures designed to scale with data volume, users and business complexity.', icon: 'Layers' },
  { title: 'Secure Data Solutions', desc: 'Role-based access, encryption and governance built into every solution from day one.', icon: 'ShieldCheck' },
  { title: 'Global Remote Delivery', desc: 'Distributed delivery teams operating across time zones with structured collaboration.', icon: 'Globe2' },
]

export const services = [
  {
    slug: 'business-intelligence',
    title: 'Business Intelligence',
    icon: 'BarChart3',
    tagline: 'Executive-grade dashboards, semantic models and enterprise reporting.',
    groups: [
      { name: 'Development', items: ['Power BI Development', 'Microsoft Fabric', 'Dashboard Development', 'Executive Reporting', 'KPI Reporting', 'Paginated Reports', 'Embedded Analytics', 'Self-Service BI'] },
      { name: 'Administration', items: ['Power BI Administration', 'Workspace Governance', 'Capacity Optimization'] },
      { name: 'Migration Services', items: ['Tableau to Power BI', 'Qlik to Power BI', 'Looker to Power BI', 'SAP BO to Power BI'] },
    ],
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    icon: 'LineChart',
    tagline: 'Advanced analytics that turn business questions into confident decisions.',
    groups: [
      { name: 'Analytics', items: ['Business Analytics', 'Advanced Reporting', 'Data Visualization', 'Data Storytelling', 'Predictive Analytics', 'Customer Analytics', 'Financial Analytics', 'Operational Analytics'] },
    ],
  },
  {
    slug: 'data-engineering',
    title: 'Data Engineering',
    icon: 'Database',
    tagline: 'Modern data platforms on Fabric, Azure, Databricks and Snowflake.',
    groups: [
      { name: 'Platforms', items: ['Azure Data Factory', 'Microsoft Fabric', 'Azure Synapse', 'Databricks', 'Snowflake', 'SQL Server'] },
      { name: 'Architecture & Pipelines', items: ['Data Warehouse', 'Lakehouse', 'ETL', 'ELT', 'Data Integration', 'Pipeline Automation'] },
    ],
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    icon: 'Brain',
    tagline: 'Statistical modelling, forecasting and predictive analytics.',
    groups: [
      { name: 'Modelling', items: ['Predictive Models', 'Statistical Analysis', 'Feature Engineering', 'Forecasting', 'Optimization Models'] },
      { name: 'Languages', items: ['Python', 'R'] },
    ],
  },
  {
    slug: 'ml-engineering',
    title: 'ML Engineering Support',
    icon: 'Cpu',
    tagline: 'Productionise machine learning with reliable MLOps foundations.',
    groups: [
      { name: 'MLOps', items: ['ML Pipeline Support', 'Model Deployment', 'Azure ML', 'MLOps Support', 'Monitoring', 'Inference Pipelines', 'Feature Store Support'] },
    ],
  },
  {
    slug: 'staff-augmentation',
    title: 'Staff Augmentation',
    icon: 'Users',
    tagline: 'Certified BI and data engineers who plug into your team seamlessly.',
    groups: [
      { name: 'Roles', items: ['Dedicated BI Developers', 'Power BI Consultants', 'Data Engineers', 'Analytics Engineers'] },
      { name: 'Contracts', items: ['Short-term Contracts', 'Long-term Contracts', 'Project Based Delivery', 'Managed Teams'] },
    ],
  },
]

export const industries = [
  { name: 'Finance', icon: 'Landmark', desc: 'FP&A, treasury, financial reporting and governed KPI platforms.' },
  { name: 'Banking', icon: 'Building2', desc: 'Regulatory, credit and portfolio analytics with strong governance.' },
  { name: 'Insurance', icon: 'ShieldCheck', desc: 'Underwriting, claims, risk and portfolio analytics.' },
  { name: 'Logistics', icon: 'Truck', desc: 'Fleet, route and delivery performance analytics.' },
  { name: 'Supply Chain', icon: 'PackageSearch', desc: 'Supplier, inventory, demand and fulfilment intelligence.' },
  { name: 'Shipping', icon: 'Ship', desc: 'Voyage, port, container and operational KPIs.' },
  { name: 'Healthcare', icon: 'HeartPulse', desc: 'Clinical, operational and patient analytics.' },
  { name: 'EdTech', icon: 'GraduationCap', desc: 'Learner, engagement and program performance analytics.' },
  { name: 'Retail', icon: 'ShoppingBag', desc: 'Sales, inventory, customer and store performance.' },
  { name: 'Manufacturing', icon: 'Factory', desc: 'OEE, quality, downtime and shift analytics.' },
  { name: 'Telecommunications', icon: 'Radio', desc: 'Network, subscriber and revenue analytics.' },
  { name: 'Energy', icon: 'Zap', desc: 'Generation, distribution and consumption analytics.' },
  { name: 'Government', icon: 'Landmark', desc: 'Public program reporting and citizen service analytics.' },
  { name: 'SaaS', icon: 'Cloud', desc: 'Product, revenue and engineering analytics for platforms.' },
]

export const technologies = [
  { name: 'Power BI', group: 'BI' },
  { name: 'Microsoft Fabric', group: 'BI' },
  { name: 'Tabular Editor', group: 'BI' },
  { name: 'DAX', group: 'BI' },
  { name: 'Power Query', group: 'BI' },
  { name: 'Azure', group: 'Cloud' },
  { name: 'Azure Synapse', group: 'Cloud' },
  { name: 'Azure Data Factory', group: 'Cloud' },
  { name: 'Azure Databricks', group: 'Cloud' },
  { name: 'Azure DevOps', group: 'DevOps' },
  { name: 'Snowflake', group: 'Cloud' },
  { name: 'SQL Server', group: 'Databases' },
  { name: 'Microsoft SQL', group: 'Databases' },
  { name: 'SAP BW', group: 'Databases' },
  { name: 'Python', group: 'Languages' },
  { name: 'R', group: 'Languages' },
  { name: 'Apache Spark', group: 'Big Data' },
  { name: 'PySpark', group: 'Big Data' },
  { name: 'Git', group: 'DevOps' },
  { name: 'REST APIs', group: 'Integration' },
  { name: 'SharePoint', group: 'Integration' },
  { name: 'Excel', group: 'Integration' },
]

export const engagementModels = [
  { name: 'Dedicated Resource', icon: 'UserCog', desc: 'Certified BI and data professionals allocated full-time to your team, working within your systems and processes.', best: 'Long horizon programs and stable roadmaps' },
  { name: 'Project Based', icon: 'ClipboardList', desc: 'Fixed-scope engagements with defined outcomes, timelines and deliverables agreed upfront.', best: 'Well-scoped initiatives with clear success criteria' },
  { name: 'Managed Services', icon: 'Server', desc: 'We run and evolve your BI or data platform as a service, with SLAs, monitoring and continuous improvement.', best: 'Post go-live operations and evolution' },
  { name: 'Consulting', icon: 'Compass', desc: 'Advisory on strategy, architecture, roadmap, tool selection and modernization for your data estate.', best: 'Executive alignment and design decisions' },
  { name: 'Support & Maintenance', icon: 'LifeBuoy', desc: 'Reliable L1 to L3 support for reports, dashboards, pipelines and data platforms.', best: 'Steady-state operations and issue resolution' },
]

export const whyClientsChoose = [
  { title: 'Fast Delivery', icon: 'Rocket' },
  { title: 'Enterprise Standards', icon: 'Award' },
  { title: 'Best Practices', icon: 'CheckCircle2' },
  { title: 'Performance Optimization', icon: 'Zap' },
  { title: 'Scalable Architecture', icon: 'Layers' },
  { title: 'Flexible Engagement', icon: 'Handshake' },
  { title: 'Transparent Communication', icon: 'MessagesSquare' },
  { title: 'High Quality Documentation', icon: 'FileCheck2' },
]

export const deliveryProcess = [
  { step: '01', title: 'Discovery', desc: 'Understand business context, KPIs, stakeholders and existing data estate.' },
  { step: '02', title: 'Requirement Gathering', desc: 'Document functional and non-functional requirements with clear acceptance criteria.' },
  { step: '03', title: 'Architecture', desc: 'Design scalable, governed and cost-aware solution architecture.' },
  { step: '04', title: 'Development', desc: 'Build iteratively with sprint reviews, CI/CD and code standards.' },
  { step: '05', title: 'Testing', desc: 'Unit, integration, UAT and performance testing with documented results.' },
  { step: '06', title: 'Deployment', desc: 'Controlled release, environment promotion and go-live support.' },
  { step: '07', title: 'Support', desc: 'Hyper-care, monitoring and ongoing improvement post go-live.' },
]

export const caseStudies = [
  {
    title: 'Executive Sales Dashboard',
    industry: 'Retail',
    challenge: 'Sales leadership relied on scattered Excel reports with no single, trusted view of revenue and territory performance.',
    solution: 'Designed a governed Power BI semantic model unifying CRM, ERP and marketing data, with a role-based executive dashboard covering revenue, pipeline, win rates and territory KPIs.',
    impact: 'Weekly review cycle reduced by 60% and revenue visibility extended from three to twelve month rolling forecasts.',
  },
  {
    title: 'Finance KPI Platform',
    industry: 'Finance',
    challenge: 'Finance team spent multiple days each month producing board reports from disconnected sources with reconciliation issues.',
    solution: 'Built a certified financial reporting layer on Microsoft Fabric with automated P&L, cash flow and variance reporting, integrated with month-end close.',
    impact: 'Report cycle time reduced by more than 70% with a single source of truth for board and management reporting.',
  },
  {
    title: 'Supply Chain Analytics',
    industry: 'Supply Chain',
    challenge: 'Fragmented supplier, warehouse and logistics data limited leadership visibility into fulfilment and inventory risk.',
    solution: 'Delivered an end-to-end supply chain analytics platform on Azure Data Factory and Databricks with inventory, supplier and demand modules.',
    impact: 'Improved on-time delivery visibility, reduced stockouts and enabled predictive demand planning.',
  },
  {
    title: 'Logistics Performance Dashboard',
    industry: 'Logistics',
    challenge: 'Operations lacked real-time insight into fleet utilization, route efficiency and last-mile SLA performance.',
    solution: 'Implemented a near real-time Power BI dashboard sourced from telematics and ERP, with route, driver and SLA analytics.',
    impact: 'Operations gained actionable, near real-time performance insight across the delivery network.',
  },
  {
    title: 'Customer Analytics',
    industry: 'Retail / SaaS',
    challenge: 'Marketing and product teams could not connect acquisition, engagement and revenue data across systems.',
    solution: 'Built a customer analytics platform with RFM, cohort and lifetime value models feeding governed Power BI dashboards.',
    impact: 'Enabled evidence-based segmentation, targeted retention programs and clearer marketing ROI.',
  },
  {
    title: 'Manufacturing Operations Reporting',
    industry: 'Manufacturing',
    challenge: 'Plant leadership relied on manual shift reports with no consolidated view of quality, downtime and OEE across lines.',
    solution: 'Delivered a manufacturing analytics layer with OEE, downtime, quality and shift KPIs on a governed data platform.',
    impact: 'Plant leadership gained a consolidated, drill-down view of operational performance across lines and shifts.',
  },
]

export const inquiryCategories = [
  { value: 'consultation', label: 'Project Consultation' },
  { value: 'support', label: 'Support' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'hiring', label: 'Hiring' },
]
