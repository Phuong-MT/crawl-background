const url = "https://api.freepik.com/v1/resources";

export class FetchRequestFreepik {
  apiKey;

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async get(params = {}) {
    const searchParams = new URLSearchParams(params);

    const res = await fetch(`${url}?${searchParams.toString()}`, {
      headers: {
        Accept: "application/json",
        "X-Freepik-API-Key": this.apiKey,
      },
    });

    if (!res.ok) {
      const error = new Error(`HTTP ${res.status}`);
      error.status = res.status;
      throw error;
    }

    return res.json();
  }
}
