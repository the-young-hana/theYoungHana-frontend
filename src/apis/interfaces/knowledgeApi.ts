export interface knowledgeApi {
  getKnowledge(): Promise<DataResponseType<KnowledgeType[]>>;
  getKnowledgeDetail(
    knowledgeIdx: number,
  ): Promise<DataResponseType<KnowledgeDetailType>>;
}
