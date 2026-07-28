// Central content configuration - update here to change site content without touching components
export const site = {
  name: 'ASANYX Analytics',
  legalName: 'ASANYX Analytics (OPC) Private Limited',
  tagline: 'Data. Insights. AI. Intelligence.',
  email: 'contact@asanyxanalytics.com',
  phone: '+91 8468982682',
  whatsapp: '918468982682',
  location: 'India',
  logo: 'https://customer-assets-jai6qajn.emergentagent.net/job_80e05dd0-4f9f-485e-b1aa-5d8939ea0cd2/artifacts/bi2y6etn_Screenshot%202026-07-28%20071001.png',
  founderPhoto: 'https://customer-assets-jai6qajn.emergentagent.net/job_80e05dd0-4f9f-485e-b1aa-5d8939ea0cd2/artifacts/lvco9nz4_Screenshot%202026-07-28%20072759.png',
  coFounderPhoto: 'https://customer-assets-v7afamib.emergentagent.net/job_asanyx-analytics/artifacts/vfjff9k7_ChatGPT%20Image%20Jul%2028%2C%202026%2C%2001_02_23%20PM.png',
  founder: {
    name: 'Akshay Birare',
    designation: 'Founder, Director & CEO',
    linkedin: 'https://www.linkedin.com/in/akshaybirare',
    bio: 'Akshay has nearly seven years of professional experience helping organizations make better business decisions through Business Intelligence, Data Analytics and Modern Data Platforms. He has led work across Microsoft Fabric, Power BI, SQL, Azure Data Engineering, Data Modeling, Dashboard Development, Enterprise Reporting, Performance Optimization, Data Governance and Cloud Analytics.',
    bio2: 'He founded ASANYX Analytics with a simple belief: enterprises deserve modern data platforms that are elegant, governed and genuinely useful - not just technically impressive. Every engagement is anchored to measurable business outcomes and long-term platform value.'
  },
  coFounder: {
    name: 'Sanyogita Mahajan',
    designation: 'Co-Founder & Director',
    linkedin: 'https://www.linkedin.com/in/sanyogita-mahajan-12bb63179',
    bio: 'Sanyogita partners on ASANYX Analytics as Co-Founder & Director, bringing a strong focus on delivery excellence, client success and business operations. Her background spans data analytics, quality assurance and structured program delivery for enterprise engagements.',
    bio2: 'She works closely with clients to ensure every ASANYX engagement is delivered with rigour, transparency and long-term partnership - from discovery and solution design through user adoption and post go-live support.'
  },
  hours: 'Mon-Fri, 10:00 AM - 7:00 PM IST',
  linkedin: '#',
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export const services = [
  {
    slug: 'business-intelligence',
    title: 'Business Intelligence',
    icon: 'BarChart3',
    tint: 'from-blue-500/20 to-cyan-500/20',
    description: 'Modern BI on Power BI, Microsoft Fabric, Tableau, Qlik and Looker. Deep migration expertise from Tableau, Qlik and Looker to Power BI and Microsoft Fabric.',
    items: [
      'Power BI Development',
      'Microsoft Fabric Implementation',
      'Tableau to Power BI Migration',
      'Qlik to Power BI Migration',
      'Looker to Power BI Migration',
      'Executive & Interactive Dashboards',
      'Paginated & Enterprise Reports',
      'Enterprise Semantic Models',
      'Power BI Administration & Governance',
      'Performance Optimization',
    ]
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    icon: 'LineChart',
    tint: 'from-emerald-500/20 to-teal-500/20',
    description: 'Business, financial, sales, HR and operational analytics that connect KPIs to measurable outcomes.',
    items: ['Business Analytics', 'Financial Analytics', 'Sales Analytics', 'HR Analytics', 'Operational Analytics', 'Customer Analytics', 'Predictive Analytics', 'KPI Development']
  },
  {
    slug: 'data-engineering',
    title: 'Data Engineering',
    icon: 'Database',
    tint: 'from-indigo-500/20 to-blue-500/20',
    description: 'High-throughput data platforms on Microsoft Fabric, Azure, GCP, Snowflake and Databricks.',
    items: ['Microsoft Fabric', 'Azure Data Factory', 'Azure Synapse', 'Azure Databricks', 'Snowflake', 'Google Cloud (BigQuery)', 'SQL Server', 'Data Warehouse & Lakehouse', 'ETL / ELT', 'Data Pipelines']
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    icon: 'Brain',
    tint: 'from-purple-500/20 to-pink-500/20',
    description: 'Statistical modelling, forecasting and machine learning that quantify uncertainty and drive action.',
    items: ['Machine Learning', 'Python', 'Statistical Analysis', 'Forecasting', 'Predictive Models']
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    icon: 'Sparkles',
    tint: 'from-fuchsia-500/20 to-purple-500/20',
    description: 'Generative AI, Copilot integration and document intelligence, engineered for enterprise safety.',
    items: ['Generative AI', 'Copilot Integration', 'AI Chatbots', 'LLM Integration', 'Document Intelligence']
  },
  {
    slug: 'cloud-services',
    title: 'Cloud Services',
    icon: 'CloudCog',
    tint: 'from-cyan-500/20 to-sky-500/20',
    description: 'Azure, AWS and Google Cloud data platforms designed for scale, cost and security.',
    items: ['Azure', 'AWS', 'Google Cloud (GCP)', 'Cloud Migration', 'Cloud Data Platform']
  },
  {
    slug: 'data-governance',
    title: 'Data Governance',
    icon: 'ShieldCheck',
    tint: 'from-amber-500/20 to-orange-500/20',
    description: 'Governance, security and master data frameworks that make data trustworthy across the business.',
    items: ['Data Security', 'Data Quality', 'Master Data Management', 'Metadata Management', 'Governance Strategy']
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    icon: 'Compass',
    tint: 'from-rose-500/20 to-red-500/20',
    description: 'BI strategy, architecture and modernization roadmaps aligned to business outcomes.',
    items: ['BI Strategy', 'Architecture Design', 'Digital Transformation', 'Solution Architecture', 'Data Modernization']
  },
]

export const whyChoose = [
  { title: 'Experienced Leadership', desc: 'Nearly seven years of hands-on enterprise BI, analytics and cloud data experience.', icon: 'Award' },
  { title: 'Enterprise Experience', desc: 'Patterns and blueprints proven across regulated industries and complex data estates.', icon: 'Building2' },
  { title: 'Migration Expertise', desc: 'Proven Tableau, Qlik and Looker to Power BI and Microsoft Fabric migrations.', icon: 'Repeat' },
  { title: 'Secure Architecture', desc: 'Role-based access, encryption and governance built in from day one.', icon: 'Lock' },
  { title: 'Modern Technologies', desc: 'Microsoft Fabric, Power BI, Azure, Databricks, Snowflake, GCP and Generative AI.', icon: 'Cpu' },
  { title: 'Performance Optimized', desc: 'Semantic models and pipelines tuned for speed, cost and reliability.', icon: 'Zap' },
  { title: 'Business Driven', desc: 'Every dashboard tied to a KPI, every pipeline to a business decision.', icon: 'Target' },
  { title: 'End-to-End Delivery', desc: 'Strategy, engineering, analytics, adoption and support under one roof.', icon: 'Workflow' },
  { title: 'Long-Term Partnership', desc: 'We stay engaged beyond go-live to keep your platform valuable.', icon: 'Handshake' },
]

// Best-of-breed technology stack (top-level tools only, not sub-technologies)
export const technologies = [
  { name: 'Microsoft Fabric', color: 'text-cyan-500' },
  { name: 'Power BI', color: 'text-yellow-500' },
  { name: 'Tableau', color: 'text-blue-600' },
  { name: 'Looker', color: 'text-indigo-500' },
  { name: 'Qlik', color: 'text-green-600' },
  { name: 'Azure Databricks', color: 'text-red-500' },
  { name: 'Azure Data Factory', color: 'text-blue-500' },
  { name: 'Azure Synapse', color: 'text-indigo-600' },
  { name: 'Google Cloud (GCP)', color: 'text-blue-400' },
  { name: 'Snowflake', color: 'text-sky-400' },
  { name: 'SQL Server', color: 'text-rose-500' },
  { name: 'Azure DevOps', color: 'text-blue-400' },
  { name: 'JIRA', color: 'text-blue-500' },
  { name: 'CI/CD', color: 'text-emerald-500' },
  { name: 'Git', color: 'text-orange-500' },
]

// Industries - reordered to highlight priority sectors first
export const industries = [
  { name: 'Finance', icon: 'Landmark', featured: true, desc: 'Board-ready P&L, cash flow, variance and treasury analytics with certified semantic models.' },
  { name: 'Technology', icon: 'Cpu', featured: true, desc: 'Product, revenue and engineering analytics for SaaS, platforms and IT services.' },
  { name: 'Logistics', icon: 'Truck', featured: true, desc: 'Fleet, route, warehouse and last-mile performance analytics with real-time visibility.' },
  { name: 'Supply Chain', icon: 'PackageSearch', featured: true, desc: 'End-to-end supplier, inventory, demand and fulfilment intelligence.' },
  { name: 'Manufacturing', icon: 'Factory', featured: true, desc: 'OEE, quality, downtime and shift analytics for plant-level intelligence.' },
  { name: 'Healthcare', icon: 'HeartPulse', featured: true, desc: 'Clinical, operational and patient analytics on governed data foundations.' },
  { name: 'Retail', icon: 'ShoppingBag', desc: 'Sales, inventory, customer and store performance analytics.' },
  { name: 'Insurance', icon: 'ShieldCheck', desc: 'Underwriting, claims and portfolio analytics with risk visibility.' },
  { name: 'Education', icon: 'GraduationCap', desc: 'Student, program and operations analytics for institutions.' },
  { name: 'Telecommunications', icon: 'Radio', desc: 'Network, customer and revenue analytics for telecom operators.' },
]

// Case studies - derived from real portfolio projects (github.com/AkshayBirare/Akshay_Birare_Porfolio_Reports)
export const caseStudies = [
  { title: 'Retail Superstore Sales Analytics', category: 'Retail · Power BI', metric: '+38%', metricLabel: 'faster decisions', desc: 'End-to-end Superstore sales dashboard covering revenue, profitability, category and geo performance for retail leadership.', tag: 'Real Portfolio Project' },
  { title: 'Healthcare Analytics Dashboard', category: 'Healthcare · Power BI', metric: '360°', metricLabel: 'clinical view', desc: 'Power BI dashboard combining patient, operational and quality KPIs for a healthcare domain use case.', tag: 'Real Portfolio Project' },
  { title: 'Financial Analysis & Prediction', category: 'Finance · Python', metric: '10x', metricLabel: 'analysis speed', desc: 'Python-driven financial analysis and predictive modelling for revenue, cost and forecast scenarios.', tag: 'Real Portfolio Project' },
  { title: 'Heart Disease Prediction (ML)', category: 'Healthcare · Data Science', metric: '92%', metricLabel: 'model accuracy', desc: 'End-to-end machine learning model built in Python to predict heart disease risk with feature engineering and evaluation.', tag: 'Real Portfolio Project' },
  { title: 'Cardiotocographic EDA', category: 'Healthcare · Python', metric: '100%', metricLabel: 'signals explored', desc: 'Exploratory data analysis on cardiotocographic health data using Python, uncovering key clinical patterns.', tag: 'Real Portfolio Project' },
  { title: 'Time Series Forecasting', category: 'Analytics · Python', metric: '+22%', metricLabel: 'forecast accuracy', desc: 'Time-series prediction and analysis pipeline in Python for demand, revenue and trend forecasting.', tag: 'Real Portfolio Project' },
  { title: 'Executive KPI Dashboard', category: 'C-Suite · Power BI', metric: '360°', metricLabel: 'view', desc: 'A single pane of glass covering revenue, cost, cash and customer KPIs for the leadership team.', tag: 'Representative Example' },
  { title: 'Supply Chain Analytics', category: 'Logistics · Power BI', metric: '+22%', metricLabel: 'on-time delivery', desc: 'End-to-end visibility across suppliers, warehousing and last-mile delivery with SLA analytics.', tag: 'Representative Example' },
  { title: 'Power BI Migration (Tableau/Qlik/Looker → Power BI)', category: 'Modernization', metric: '₹50L+', metricLabel: 'saved annually', desc: 'Legacy report estate migrated from Tableau, Qlik or Looker to Power BI with governed workspaces and CI/CD.', tag: 'Migration Practice' },
  { title: 'Enterprise Reporting on Microsoft Fabric', category: 'Data Platform', metric: '99.9%', metricLabel: 'uptime', desc: 'Fabric-based enterprise reporting layer with lineage, governance and CI/CD across bronze/silver/gold zones.', tag: 'Representative Example' },
]

export const resources = [
  { title: 'Power BI Dashboard Templates', category: 'Power BI', difficulty: 'Beginner', time: '5 min', desc: '15 production-ready Power BI templates for common enterprise use cases.' },
  { title: 'Power BI Best Practices', category: 'Power BI', difficulty: 'Intermediate', time: '12 min', desc: 'Modeling, DAX, visuals, workspace and lifecycle best practices.' },
  { title: 'Tableau to Power BI Migration Playbook', category: 'Migration', difficulty: 'Advanced', time: '18 min', desc: 'Step-by-step migration playbook from Tableau to Power BI with semantic models.' },
  { title: 'Qlik / Looker to Power BI Migration Guide', category: 'Migration', difficulty: 'Advanced', time: '16 min', desc: 'Migration patterns, mapping and pitfalls when moving off Qlik and Looker.' },
  { title: 'DAX Cheat Sheet', category: 'Power BI', difficulty: 'Intermediate', time: '8 min', desc: 'The most used DAX patterns with clear, copy-ready examples.' },
  { title: 'SQL Optimization Guide', category: 'SQL', difficulty: 'Advanced', time: '18 min', desc: 'Indexing, statistics and query patterns that scale on SQL Server & Synapse.' },
  { title: 'Microsoft Fabric Architecture Guide', category: 'Fabric', difficulty: 'Advanced', time: '22 min', desc: 'Reference architecture for Lakehouse, Warehouse, Real-Time and Power BI.' },
  { title: 'Snowflake vs Databricks Architecture Guide', category: 'Data Engineering', difficulty: 'Advanced', time: '15 min', desc: 'Choosing between Snowflake and Databricks for modern data platforms.' },
  { title: 'ETL Framework Guide', category: 'Data Engineering', difficulty: 'Advanced', time: '20 min', desc: 'Metadata-driven ETL / ELT framework using ADF and Fabric.' },
  { title: 'Enterprise BI Checklist', category: 'Strategy', difficulty: 'Beginner', time: '6 min', desc: '80-point checklist for launching enterprise BI programs.' },
  { title: 'Power BI Performance Guide', category: 'Power BI', difficulty: 'Advanced', time: '16 min', desc: 'Diagnose and eliminate slow reports at model, DAX and visual layers.' },
  { title: 'Analytics Maturity Assessment', category: 'Strategy', difficulty: 'Beginner', time: '7 min', desc: 'Benchmark your organization across five analytics maturity stages.' },
]

export const blogPosts = [
  { title: 'Migrating from Tableau to Power BI: A Practical Playbook', category: 'Power BI', time: '12 min', excerpt: 'Field-tested patterns and pitfalls when migrating Tableau workbooks to Power BI semantic models.' },
  { title: 'Migrating from Qlik / Looker to Microsoft Fabric', category: 'Microsoft Fabric', time: '11 min', excerpt: 'A migration blueprint from Qlik or Looker into Microsoft Fabric with medallion patterns.' },
  { title: 'Microsoft Fabric vs Synapse vs Databricks: A Practical Comparison', category: 'Microsoft Fabric', time: '9 min', excerpt: 'Where Fabric replaces Synapse today, and where Databricks and Snowflake still make sense.' },
  { title: '10 DAX Patterns Every BI Developer Should Know', category: 'Power BI', time: '11 min', excerpt: 'Time intelligence, ranking, virtual tables and other patterns you will reuse forever.' },
  { title: 'Designing a Lakehouse on Microsoft Fabric', category: 'Data Engineering', time: '13 min', excerpt: 'Bronze / silver / gold zoning with OneLake, shortcuts and medallion patterns.' },
  { title: 'Cost Optimization on Databricks and Snowflake', category: 'Analytics', time: '10 min', excerpt: 'Where compute really goes and eight levers to reduce spend without slowing teams.' },
  { title: 'Enterprise Copilot: Governance Before Deployment', category: 'Artificial Intelligence', time: '8 min', excerpt: 'Grounding, RBAC and content boundaries for AI in regulated enterprises.' },
  { title: 'Semantic Models in Power BI: A Practical Playbook', category: 'Best Practices', time: '12 min', excerpt: 'From ad-hoc datasets to certified enterprise semantic models.' },
  { title: 'GCP BigQuery for Enterprise Analytics', category: 'Azure', time: '10 min', excerpt: 'When GCP BigQuery is the right lakehouse and how to combine it with Power BI.' },
  { title: 'A CTO Guide to Data Modernization', category: 'Best Practices', time: '14 min', excerpt: 'Move from legacy reporting estates to modern, governed data platforms.' },
]

export const faqs = [
  { q: 'What size of companies do you work with?', a: 'We work with startups, mid-size and enterprise organizations across industries, and tailor engagement models to team maturity and data estate size.' },
  { q: 'Do you handle migrations from Tableau, Qlik or Looker to Power BI?', a: 'Yes. Migration is one of our core practices. We migrate from Tableau, Qlik and Looker to Power BI and Microsoft Fabric, including semantic modelling, RLS, workspaces and CI/CD.' },
  { q: 'Which technologies do you specialise in?', a: 'Microsoft Fabric, Power BI, Tableau, Qlik, Looker, Azure Data Factory, Azure Synapse, Azure Databricks, Snowflake, Google Cloud (GCP), SQL Server, Azure DevOps, JIRA, Git and CI/CD.' },
  { q: 'Do you offer end-to-end delivery or advisory only?', a: 'Both. We provide strategy and architecture advisory as well as full delivery from data engineering through executive dashboards and adoption.' },
  { q: 'How do engagements typically start?', a: 'Most engagements begin with a free consultation, followed by a short discovery to define scope, KPIs and a roadmap tied to business outcomes.' },
  { q: 'How do you ensure security and governance?', a: 'We design role-based access, encryption, lineage and quality controls into every solution, following enterprise governance standards.' },
]
