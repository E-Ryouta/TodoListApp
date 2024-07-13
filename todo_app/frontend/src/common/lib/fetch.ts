// fetch用の共通関数

// Getリクエストを送る関数
export const fetchGet = async (
  endpoint: string,
  queryObj: { [key: string]: string }
) => {
  const url = getUrl(endpoint);
  const query = objectToQuery(queryObj);
  const response = await fetch(`${url}${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// URLを取得する関数を作る
const getUrl = (endpoint: string) => {
  const baseUrl = process.env.BACKEND_ORIGIN_CLIENT || "http://localhost:3000";
  return `${baseUrl}${endpoint}`;
};

// クエリパラメータを取得する関数を作る
const objectToQuery = (obj: { [key: string]: string }) => {
  const query = Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return query ? `?${query}` : "";
};
