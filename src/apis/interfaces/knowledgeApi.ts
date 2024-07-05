export interface knowledgeApi {
  getKnowledge(page: number): Promise<DataResponseType<KnowledgeType[]>>;
  getKnowledgeDetail(
    knowledgeIdx: number,
  ): Promise<DataResponseType<KnowledgeDetailType>>;
}
