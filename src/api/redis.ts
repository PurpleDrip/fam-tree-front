import IEdge from "@/types/edge";
import INode from "@/types/node";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL as string,
  token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN as string,
});

const pipeline=redis.pipeline();

const updateCache = async (
  nodes: INode[],
  edges: IEdge[],
  treeName: string,
  treeId:string,
): Promise<void> => {
  try {
    pipeline.hset(`tree:${treeId}`, {
        treeName,
        nodes:nodes,
        edges: edges,
      });
      
      pipeline.expire(`tree:${treeId}`, 5 * 60);
      pipeline.sadd("trees:modified", treeId);
      
      await pipeline.exec(); 

  } catch (error) {
    console.error(`Redis cache update failed for treeId: ${treeId}`, error);
  }
};

export default updateCache;
