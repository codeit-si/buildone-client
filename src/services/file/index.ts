import axios from "axios";

import { api } from "@/lib/axios";
import { ENDPOINT } from "@/services/endpoint";
import { FilePresignedUrlResponse } from "@/types/file";
import { getCookie } from "@/utils/cookie";

interface GetPresignedUrlParams {
  prefix: string;
  fileName: string;
}

export const getPresignedUrl = async ({
  prefix,
  fileName,
}: GetPresignedUrlParams) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.get<FilePresignedUrlResponse>(
    ENDPOINT.FILE.GET(prefix, fileName),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
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
