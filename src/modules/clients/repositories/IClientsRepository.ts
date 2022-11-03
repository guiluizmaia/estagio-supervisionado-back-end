import { Addresses } from '../../commonData/infra/typeorm/entities/Addresses';
import { Phones } from '../../commonData/infra/typeorm/entities/Phones';
import { Clients } from '../infra/typeorm/entities/Clients';

export interface ClientsDtos {
    id?: string;
    name: string;
    rg: string;
    cpf: string;
    initDate?: Date;
    userId?: string;
    phones?: Phones[];
    addresses?: Addresses[];
    active?: boolean;
    exclude?: boolean;
}

interface IClientsRepository {
  findById(id: String): Promise<Clients | undefined>;
  findByCpf(cpf: String): Promise<Clients | undefined>;
  create(client: ClientsDtos): Promise<Clients>;
  save(client: Clients): Promise<Clients>;
  index(skip?: number, take?: number): Promise<Clients[]>;
  search(name: string, skip?: number, take?: number): Promise<Clients[]>;
  searchAll(name: string): Promise<Clients[]>
  countSearch(name: string): Promise<number>
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}

export default IClientsRepository;
