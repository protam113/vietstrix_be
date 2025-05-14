import { ProjectDocument } from '../../../entities/project.entity';

export interface CreateProjectResponse {
  status: string;
  result: ProjectDocument;
}
