import IProject from "./IProject";

export default interface ITask {
    id: string
    timeInSecond: number,
    description: string,
    project?: IProject
}