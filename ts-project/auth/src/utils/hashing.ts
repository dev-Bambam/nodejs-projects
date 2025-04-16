import { hash, compare } from "bcryptjs";
import { createHmac } from "crypto";

export const doHash = async (data: string, salt: number) => {
   return await hash(data, salt);
};

export const doCompare = async (data: string, hashedData: string) => {
   return await compare(data, hashedData);
};

export const doHmac = (data: string, key: string | undefined) => {
   if (!data || !key) throw new Error("please provide data or key value");
   return createHmac("sha256", key).update(data).digest("hex");
};

export const doHmacCompare = (data: string, hashedData: string | undefined): boolean => {
   console.log(`data:${data}, hashedData:${hashedData}`)
   return hashedData === doHmac(data, process.env.HMAC_KEY);
};
