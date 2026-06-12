/* eslint-disable @typescript-eslint/no-explicit-any */
// Laravel standard response structure
import Cookies from "js-cookie";
export type LaravelResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    [key: string]: any;
  };
  errors?: Record<string, string[]>;
};

// Tambahkan class ini di bagian atas file
export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    code?: string,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

type ApiOptions = {
  method?: string;
  body?: any;
  token?: string;
  revalidate?: number;
  params?: Record<string, any>;
  responseType?: "json" | "blob"; // ✅ Tambahkan ini
};

// ========================================
// HELPER FUNCTIONS
// ========================================

function buildUrl(url: string, params?: Record<string, any>) {
  if (!params) return url;
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null),
  );
  if (Object.keys(filtered).length === 0) return url;
  const query = new URLSearchParams(filtered).toString();
  return `${url}?${query}`;
}

function getStoredToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return Cookies.get("token");
}

async function baseFetch<T>(url: string, options?: ApiOptions): Promise<any> {
  try {
    const {
      method = "GET",
      body,
      token,
      revalidate,
      params,
      responseType = "json",
    } = options || {};
    const isFormData = body instanceof FormData;

    if (!url) {
      throw new Error("URL is required for API call");
    }

    const fullUrl = buildUrl(url, params);

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (body && method !== "GET" && !isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const effectiveToken = token || getStoredToken();

    if (effectiveToken) {
      headers["Authorization"] = `Bearer ${effectiveToken}`;
    }

    const res = await fetch(fullUrl, {
      method,
      headers,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      next: revalidate ? { revalidate } : undefined,
    });

    if (responseType === "blob") {
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        // ✅ Gunakan ApiError untuk Blob jika gagal
        throw new ApiError(
          errorData.message || `API Error ${res.status}`,
          res.status,
          errorData.code,
        );
      }

      const blob = await res.blob();
      const contentDisposition = res.headers.get("content-disposition");

      return {
        blob,
        contentDisposition,
      };
    }

    // Parse response
    const responseData = await res.json();

    // Check if response is OK
    if (!res.ok) {
      // ✅ Lemparkan objek ApiError lengkap dengan status, code, dan validation errors
      throw new ApiError(
        responseData.message || responseData.error || `API Error ${res.status}`,
        res.status,
        responseData.code, // Catch 'MUST_CHANGE_PASSWORD' dari middleware
        responseData.errors, // Catch validation errors dari Laravel ($request->validate)
      );
    }

    return responseData as LaravelResponse<T>;
  } catch (error) {
    console.error("API Request failed:", error);

    // ✅ Jika error yang ditangkap adalah instansiasi dari ApiError, teruskan langsung
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      typeof error === "string" ? error : "An unexpected error occurred",
    );
  }
}

// ========================================
// API CLIENT
// ========================================

export const api = {
  // GET request - returns full Laravel response
  get: <T>(
    url: string,
    opts?: { params?: any; revalidate?: number; token?: string },
  ) => baseFetch<T>(url, { method: "GET", ...opts }),

  // GET request - returns only data (convenience method)
  getData: async <T>(
    url: string,
    opts?: { params?: any; revalidate?: number; token?: string },
  ): Promise<T> => {
    const response = await baseFetch<T>(url, { method: "GET", ...opts });
    return response.data;
  },

  post: <T>(url: string, body: any, token?: string) =>
    baseFetch<T>(url, { method: "POST", body, token }),

  postFormData: <T>(url: string, body: FormData, token?: string) =>
    baseFetch<T>(url, { method: "POST", body, token }),
  // POST request - returns only data (convenience method)
  postData: async <T>(url: string, body: any, token?: string): Promise<T> => {
    const response = await baseFetch<T>(url, { method: "POST", body, token });
    return response.data;
  },
  postBlob: (url: string, body: any, token?: string) =>
    baseFetch(url, { method: "POST", body, token, responseType: "blob" }),

  getBlob: (url: string, opts?: { params?: any; token?: string }) =>
    baseFetch(url, { method: "GET", ...opts, responseType: "blob" }),
  put: <T>(url: string, body: any, token?: string) =>
    baseFetch<T>(url, { method: "PUT", body, token }),

  delete: <T>(url: string, token?: string) =>
    baseFetch<T>(url, { method: "DELETE", token }),
};
