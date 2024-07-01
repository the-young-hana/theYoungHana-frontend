interface KnowledgeType {
  knowledgeIdx: number;
  knowledgeTitle: string;
  knowledgeSummary: string;
  knowledgeImage: string;
}

interface KnowledgeDetailType {
  knowledgeTitle: string;
  knowledgeContent: string;
  knowledgeImage: string;
  knowledgeCategory: string;
  createdAt: Date;
  updatedAt: Date;
}
