import { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/cn";

import Button from "./button";
import LoadingSpinner from "./loading-spinner";

export default function EmbeddedFrame({
  linkUrl,
  fixed,
}: {
  linkUrl: string;
  fixed?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLinkStatus = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsBlocked(false);
    } catch (error) {
      setIsBlocked(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLinkStatus(linkUrl);
  }, [linkUrl]);

  return (
    <div
      className={cn(
        "right-800 z-40 flex w-full items-center justify-center bg-slate-200 text-center lg:h-full lg:w-[calc(100vw-793px)]",
        fixed
          ? "h-358 md:h-522 md:w-full md:border-b lg:fixed"
          : "top-0 mt-24 h-413 lg:absolute lg:m-0",
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center",
          fixed ? "h-full lg:h-385" : "h-413 md:h-372 lg:h-385",
        )}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : isBlocked ? (
          // 임베디드 차단
          <div className="flex h-full w-full flex-col items-center justify-center bg-white bg-opacity-30 lg:bg-opacity-100">
            <p className="mb-20 text-slate-500">
              이 링크는 임베드할 수 없습니다.
            </p>
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              <Button className="px-20 py-10">새 창에서 열기 🔗</Button>
            </a>
          </div>
        ) : (
          // 임베디드 허용
          <iframe
            ref={iframeRef}
            title={`Embedded Content from ${new URL(linkUrl).hostname}`}
            src={linkUrl}
            className="h-full w-full"
          />
        )}
      </div>
    </div>
  );
}
