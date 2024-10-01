// fetch用の共通関数

// Getリクエストを送る関数
export const fetchGet = async <T = any>(
  endpoint: string,
  queryObj?: { [key: string]: string }
): Promise<T> => {
  const url = getUrl(endpoint);
  const query = queryObj ? objectToQuery(queryObj) : "";
  const response = await fetch(`${url}${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// PUTリクエストを送る関数
export const fetchPut = async (
  endpoint: string,
  body: { [key: string]: any }
) => {
  const url = getUrl(endpoint);
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// DELETEリクエストを送る関数
export const fetchDelete = async (
  endpoint: string,
  body: { [key: string]: string }
) => {
  const url = getUrl(endpoint);
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// URLを作成する関数を作る
const getUrl = (endpoint: string) => {
  const baseUrl = process.env.BACKEND_ORIGIN_CLIENT || "http://localhost:3000";
  return `${baseUrl}${endpoint}`;
};

// クエリパラメータを作成する関数を作る
const objectToQuery = (obj: { [key: string]: string }) => {
  const query = Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return query ? `?${query}` : "";
};
