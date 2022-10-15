import { FormPayment } from "../infra/typeorm/entities/FormPayment";

export interface FormPaymentDtos{
    formPayment: string;
}

interface IFormPaymentRepository {
    findById(id: string): Promise<FormPayment | undefined>;
    findByName(name: string): Promise<FormPayment | undefined>;
    create(formPayment: FormPaymentDtos): Promise<FormPayment>;
    save(formPayment: FormPayment): Promise<FormPayment>;
    index(skip?: number, take?: number): Promise<FormPayment[]>;
    count(): Promise<number>;
    delete(id: string): Promise<void>;
}

export default IFormPaymentRepository