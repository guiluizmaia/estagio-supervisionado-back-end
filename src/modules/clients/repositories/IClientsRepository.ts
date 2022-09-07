import { Addresses } from 'src/modules/commonData/infra/typeorm/entities/Addresses';
import { Phones } from 'src/modules/commonData/infra/typeorm/entities/Phones';
import { Clients } from '../infra/typeorm/entities/Clients';

export interface ClientsDtos {
    name: string;
    rg: string;
    cpf: string;
    initDate?: Date;
    userId?: string;
    phones?: Phones[];
    addresses?: Addresses[];
    active?: boolean;
}

interface IClientsRepository {
  findById(id: String): Promise<Clients | undefined>;
  findByCpf(cpf: String): Promise<Clients | undefined>;
  create(client: ClientsDtos): Promise<Clients>;
  save(client: Clients): Promise<Clients>;
  index(): Promise<Clients[]>;
  delete(id: string): Promise<void>;
}

export default IClientsRepository;
