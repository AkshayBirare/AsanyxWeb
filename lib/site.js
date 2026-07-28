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
  founder: {
    name: 'Akshay Birare',
    designation: 'Founder, Director & CEO',
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
    description: 'Enterprise-grade Power BI and Microsoft Fabric platforms that turn scattered data into executive-ready insight.',
    items: ['Power BI Development', 'Microsoft Fabric', 'Executive Dashboards', 'Interactive Dashboards', 'Paginated Reports', 'Power BI Administration', 'Enterprise Semantic Models', 'Performance Optimization']
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
    description: 'Reliable, high-throughput data pipelines built on Fabric, Azure, Databricks and Snowflake.',
    items: ['Azure Data Factory', 'Microsoft Fabric', 'Azure Synapse', 'Databricks', 'Snowflake', 'SQL Server', 'Data Warehouse', 'Lakehouse', 'ETL / ELT', 'Data Pipelines']
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
    items: ['Azure', 'AWS', 'Google Cloud', 'Cloud Migration', 'Cloud Data Platform']
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
  { title: 'Scalable Solutions', desc: 'Architectures designed to grow with data volume, users and business complexity.', icon: 'TrendingUp' },
  { title: 'Secure Architecture', desc: 'Role-based access, encryption and governance built in from day one.', icon: 'Lock' },
  { title: 'Modern Technologies', desc: 'Microsoft Fabric, Power BI, Azure, Databricks, Snowflake and Generative AI.', icon: 'Cpu' },
  { title: 'Performance Optimized', desc: 'Semantic models and pipelines tuned for speed, cost and reliability.', icon: 'Zap' },
  { title: 'Business Driven', desc: 'Every dashboard tied to a KPI, every pipeline to a business decision.', icon: 'Target' },
  { title: 'End-to-End Delivery', desc: 'Strategy, engineering, analytics, adoption and support under one roof.', icon: 'Workflow' },
  { title: 'Long-Term Partnership', desc: 'We stay engaged beyond go-live to keep your platform valuable.', icon: 'Handshake' },
]

export const technologies = [
  { name: 'Power BI', color: 'text-yellow-500' },
  { name: 'Microsoft Fabric', color: 'text-cyan-500' },
  { name: 'Azure', color: 'text-sky-500' },
  { name: 'Azure Data Factory', color: 'text-blue-500' },
  { name: 'Azure Synapse', color: 'text-indigo-500' },
  { name: 'Databricks', color: 'text-red-500' },
  { name: 'Snowflake', color: 'text-sky-400' },
  { name: 'SQL Server', color: 'text-rose-500' },
  { name: 'Python', color: 'text-emerald-500' },
  { name: 'Azure DevOps', color: 'text-blue-400' },
  { name: 'Git', color: 'text-orange-500' },
  { name: 'Power Query', color: 'text-yellow-400' },
  { name: 'DAX', color: 'text-amber-500' },
  { name: 'REST APIs', color: 'text-teal-500' },
]

export const industries = [
  { name: 'Manufacturing', icon: 'Factory' },
  { name: 'Retail', icon: 'ShoppingBag' },
  { name: 'Finance', icon: 'Landmark' },
  { name: 'Healthcare', icon: 'HeartPulse' },
  { name: 'Insurance', icon: 'ShieldCheck' },
  { name: 'Supply Chain', icon: 'Truck' },
  { name: 'Logistics', icon: 'PackageSearch' },
  { name: 'Education', icon: 'GraduationCap' },
  { name: 'Technology', icon: 'Cpu' },
  { name: 'Telecommunications', icon: 'Radio' },
]

export const caseStudies = [
  { title: 'Sales Dashboard', category: 'Business Intelligence', metric: '+38%', metricLabel: 'faster decisions', desc: 'Unified revenue KPIs, pipeline health and territory performance for sales leadership.' },
  { title: 'Manufacturing Analytics', category: 'Operations', metric: '-24%', metricLabel: 'downtime', desc: 'OEE, quality and shift analytics feeding a real-time plant intelligence layer.' },
  { title: 'Finance Reporting', category: 'Enterprise Reporting', metric: '10x', metricLabel: 'report speed', desc: 'Board-ready P&L, cash flow and variance reporting on a semantic model.' },
  { title: 'HR Dashboard', category: 'People Analytics', metric: '+55%', metricLabel: 'self-service', desc: 'Attrition, headcount and engagement insights across geographies.' },
  { title: 'Inventory Dashboard', category: 'Supply Chain', metric: '-18%', metricLabel: 'stockouts', desc: 'Live stock positioning, aging and reorder recommendations.' },
  { title: 'Supply Chain Analytics', category: 'Logistics', metric: '+22%', metricLabel: 'on-time delivery', desc: 'End-to-end visibility across suppliers, warehousing and last-mile.' },
  { title: 'Customer Analytics', category: 'CX / Retail', metric: '+31%', metricLabel: 'retention', desc: 'RFM, cohort and lifetime value analytics powering segmentation.' },
  { title: 'Executive KPI Dashboard', category: 'C-Suite', metric: '360°', metricLabel: 'view', desc: 'A single pane of glass for revenue, cost, cash and customer KPIs.' },
  { title: 'Power BI Migration', category: 'Modernization', metric: '₹50L+', metricLabel: 'saved annually', desc: 'Legacy report estate migrated to Power BI with governed workspaces.' },
  { title: 'Enterprise Reporting', category: 'Data Platform', metric: '99.9%', metricLabel: 'uptime', desc: 'Fabric-based enterprise reporting layer with lineage and CI/CD.' },
]

export const resources = [
  { title: 'Power BI Dashboard Templates', category: 'Power BI', difficulty: 'Beginner', time: '5 min', desc: '15 production-ready Power BI templates for common enterprise use cases.' },
  { title: 'Power BI Best Practices', category: 'Power BI', difficulty: 'Intermediate', time: '12 min', desc: 'Modeling, DAX, visuals, workspace and lifecycle best practices.' },
  { title: 'DAX Cheat Sheet', category: 'Power BI', difficulty: 'Intermediate', time: '8 min', desc: 'The most used DAX patterns with clear, copy-ready examples.' },
  { title: 'SQL Optimization Guide', category: 'SQL', difficulty: 'Advanced', time: '18 min', desc: 'Indexing, statistics and query patterns that scale on SQL Server & Synapse.' },
  { title: 'Microsoft Fabric Architecture Guide', category: 'Fabric', difficulty: 'Advanced', time: '22 min', desc: 'Reference architecture for Lakehouse, Warehouse, Real-Time and Power BI.' },
  { title: 'Data Modeling Best Practices', category: 'Modeling', difficulty: 'Intermediate', time: '14 min', desc: 'Star, snowflake and Data Vault patterns explained with tradeoffs.' },
  { title: 'ETL Framework Guide', category: 'Data Engineering', difficulty: 'Advanced', time: '20 min', desc: 'Metadata-driven ETL / ELT framework using ADF and Fabric.' },
  { title: 'Enterprise BI Checklist', category: 'Strategy', difficulty: 'Beginner', time: '6 min', desc: '80-point checklist for launching enterprise BI programs.' },
  { title: 'Power BI Performance Guide', category: 'Power BI', difficulty: 'Advanced', time: '16 min', desc: 'Diagnose and eliminate slow reports at model, DAX and visual layers.' },
  { title: 'Dashboard Design Principles', category: 'Design', difficulty: 'Beginner', time: '9 min', desc: 'Executive dashboard patterns, layout and visual grammar.' },
  { title: 'Power Query Guide', category: 'Power BI', difficulty: 'Intermediate', time: '11 min', desc: 'Robust Power Query patterns and M language techniques.' },
  { title: 'Analytics Maturity Assessment', category: 'Strategy', difficulty: 'Beginner', time: '7 min', desc: 'Benchmark your organization across five analytics maturity stages.' },
]

export const blogPosts = [
  { title: 'Microsoft Fabric vs. Synapse: A Practical Comparison', category: 'Microsoft Fabric', time: '9 min', excerpt: 'Where Fabric replaces Synapse today, and where a hybrid architecture still makes sense.' },
  { title: '10 DAX Patterns Every BI Developer Should Know', category: 'Power BI', time: '11 min', excerpt: 'Time intelligence, ranking, virtual tables and other patterns you will reuse forever.' },
  { title: 'Designing a Lakehouse on Microsoft Fabric', category: 'Data Engineering', time: '13 min', excerpt: 'Bronze / silver / gold zoning with OneLake, shortcuts and medallion patterns.' },
  { title: 'Cost Optimization on Databricks and Snowflake', category: 'Analytics', time: '10 min', excerpt: 'Where compute really goes and eight levers to reduce spend without slowing teams.' },
  { title: 'Enterprise Copilot: Governance Before Deployment', category: 'Artificial Intelligence', time: '8 min', excerpt: 'Grounding, RBAC and content boundaries for AI in regulated enterprises.' },
  { title: 'Semantic Models in Power BI: A Practical Playbook', category: 'Best Practices', time: '12 min', excerpt: 'From ad-hoc datasets to certified enterprise semantic models.' },
  { title: 'SQL Server 2022: Query Store & Intelligent Query Processing', category: 'SQL', time: '10 min', excerpt: 'The performance features you should actually turn on in production.' },
  { title: 'AI-Ready Data: Why Governance Matters More Than Ever', category: 'Data Science', time: '7 min', excerpt: 'The data foundations that separate real AI value from prototypes.' },
  { title: 'A CTO\u2019s Guide to Data Modernization', category: 'Best Practices', time: '14 min', excerpt: 'Move from legacy reporting estates to modern, governed data platforms.' },
  { title: 'Power BI Performance: A Deep Dive', category: 'Performance Optimization', time: '15 min', excerpt: 'How to profile, diagnose and fix slow Power BI reports for good.' },
]

export const faqs = [
  { q: 'What size of companies do you work with?', a: 'We work with startups, mid-size and enterprise organizations across industries, and tailor engagement models to team maturity and data estate size.' },
  { q: 'Which technologies do you specialise in?', a: 'Microsoft Power BI, Microsoft Fabric, Azure Data Factory, Azure Synapse, Databricks, Snowflake, SQL Server, Python and modern AI - with deep expertise across the Microsoft data stack.' },
  { q: 'Do you offer end-to-end delivery or advisory only?', a: 'Both. We provide strategy and architecture advisory as well as full delivery from data engineering through executive dashboards and adoption.' },
  { q: 'How do engagements typically start?', a: 'Most engagements begin with a free consultation, followed by a short discovery to define scope, KPIs and a roadmap tied to business outcomes.' },
  { q: 'How do you ensure security and governance?', a: 'We design role-based access, encryption, lineage and quality controls into every solution, following enterprise governance standards.' },
]
