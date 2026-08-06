export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  image: string;
  tag: string;
  bio: string;
}

export const SPEAKERS_DATA: Speaker[] = [
  {
    id: "sp-1",
    name: "Gowri Manoharan",
    role: "BI & Data Warehousing Specialist",
    company: "14+ Years Expertise in Data Engineering & Cloud Solutions",
    topic: "Business Intelligence, ETL & Cloud-Based Data Solutions",
    image: "/speakers/gowri-manoharan.png",
    tag: "Keynote Speaker",
    bio: "Gowri Manoharan is an experienced Business Intelligence and Data Warehousing professional with 14+ years of expertise in data engineering, ETL development, reporting, and cloud-based data solutions. She specializes in SQL Server, SSIS, SSRS, Azure Data Factory, and Azure Databricks, and has successfully delivered data transformation and analytics projects across banking, insurance, telecommunications, and energy sectors. With a strong blend of technical expertise and leadership experience, she is recognized for driving business value through data-driven solutions and continuous innovation."
  }
];
