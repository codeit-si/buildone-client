// DOMParser를 사용해 HTML 태그를 제거한 후, Markdown 구문도 제거하는 함수
export const stripMarkdown = (str: string): string => {
  if (!str) return "";

  // 1. HTML 태그 제거
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  let plainText = doc.body.textContent || "";

  // 2. Markdown 헤딩(#) 제거 (각 줄의 시작에서 1~6개의 #와 그 뒤의 공백)
  plainText = plainText.replace(/^\s*#{1,6}\s+/gm, "");

  // 3. Markdown 블록인용(>) 제거 (각 줄의 시작에서 >와 그 뒤의 공백)
  plainText = plainText.replace(/^\s*>+\s?/gm, "");

  // 4. 순서 없는 리스트 기호 (-, *, +) 제거
  plainText = plainText.replace(/^\s*[-*+]\s+/gm, "");

  // 5. 순서 있는 리스트 기호 (1. , 2. , ...) 제거
  plainText = plainText.replace(/^\s*\d+\.\s+/gm, "");

  // 6. Bold 제거: **text** 또는 __text__ 에서 마커 제거
  plainText = plainText.replace(/(\*\*|__)(.*?)\1/g, "$2");

  // 7. Italic 제거: *text* 또는 _text_ 에서 마커 제거
  plainText = plainText.replace(/(\*|_)(.*?)\1/g, "$2");

  return plainText;
};

// HTML 및 Markdown 구문 제거 후, 공백 제거하여 글자 수 계산
export const countWithoutSpaces = (str: string): number => {
  if (!str) return 0;
  const plainText = stripMarkdown(str);
  return plainText.replace(/\s/g, "").length;
};

// HTML 및 Markdown 구문 제거 후, 공백 포함한 글자 수 계산
export const countWithSpaces = (str: string): number => {
  if (!str) return 0;
  const plainText = stripMarkdown(str);
  return plainText.length;
};
