import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerRecordDto } from '../dtos/create-customer-record.dto';

export abstract class CustomerRepository {
  abstract create(createCustomerRecordDto: CreateCustomerRecordDto): Promise<CustomerEntity>

  abstract getByEmail(email: string): Promise<CustomerEntity | null>
}
