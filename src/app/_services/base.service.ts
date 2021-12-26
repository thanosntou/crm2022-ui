import { environment } from '../../environments/environment';

export class BaseService {
  readonly BE_URL: string = environment.backendBaseUrl;
}
