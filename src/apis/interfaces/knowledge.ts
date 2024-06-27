export interface knowledgeApi {
  getKnowledge(): Promise<DataResponseType<KnowledgeReadType>>;
}
