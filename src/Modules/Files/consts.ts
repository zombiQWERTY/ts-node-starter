import { isDevelopment } from '../../Helpers/ENV/NODE_ENV';

export const filesFolder = isDevelopment() ? `${process.cwd()}/uploads` : '/home/userContent/uploadedFiles';
