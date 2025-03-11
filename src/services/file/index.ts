import axios from "axios";

import { api } from "@/lib/axios";
import { ENDPOINT } from "@/services/endpoint";
import { FilePresignedUrlResponse } from "@/types/file";

interface GetPresignedUrlParams {
  prefix: string;
  fileName: string;
}

export const getPresignedUrl = async ({
  prefix,
  fileName,
}: GetPresignedUrlParams) => {
  const { data } = await api.get<FilePresignedUrlResponse>(
    ENDPOINT.FILE.GET(prefix, fileName),
  );
  return data.presignedUrl;
};

interface PutFileToPresignedUrlParams {
  presignedUrl: string;
  file: File;
}

export const putFileToPresignedUrl = async ({
  presignedUrl,
  file,
}: PutFileToPresignedUrlParams) => {
  const { data } = await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return data;
};
