import IEdge from "./edge";
import  INode  from "./node";

export interface ITree{
    treeName:string,
    nodes:Array<INode>
    edges:Array<IEdge>
}