const url = "https://api.freepik.com/v1/resources";

export class FetchRequestFreepik {
  apiKey;

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async get(params = {}) {
    try {
      const searchParams = new URLSearchParams(params);

      const res = await fetch(`${url}?${searchParams.toString()}`, {
        headers: {
          "Accept": "application/json",
          "X-Freepik-API-Key": this.apiKey
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      return data;

    } catch (err) {
      console.error("fetch request freepik error:", err);
      return null;
    }
  }
}