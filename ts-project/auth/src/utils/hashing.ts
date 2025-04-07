import { hash, compare } from 'bcryptjs';
import { createHmac } from 'crypto';

export const doHash = async (data: string, salt: number) => {
    return await hash(data, salt);
}

export const doCompare = async (data: string, hashedData: string) => {
    return await compare(data, hashedData)
}

export const doHmac = (data: string, key: string) => {
    if (!data || !key) throw new Error('please provide data or key value')
    return createHmac('sha256', key).update(data).digest('hex')
}