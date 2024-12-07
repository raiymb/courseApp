import { AppDataSource } from '../config/db';
import { Material } from '../models/Material';
import { IMaterial } from '../interfaces/IMaterial';

export class MaterialService {
    static async getMaterialsByCourse(courseId: number): Promise<IMaterial[]> {
      const materialRepository = AppDataSource.getRepository(Material);
      return await materialRepository.find({ where: { course: { id: courseId } } });
    }
  
    static async createMaterial(materialData: Partial<IMaterial>): Promise<IMaterial> {
      const materialRepository = AppDataSource.getRepository(Material);
      const material = materialRepository.create(materialData);
      return await materialRepository.save(material);
    }
  }