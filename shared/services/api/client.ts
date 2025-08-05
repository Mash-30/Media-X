import { API_CONFIG, HTTP_METHODS, type HttpMethod } from '../../utils/constants/api';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod = HTTP_METHODS.GET,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    };

    if (data && method !== HTTP_METHODS.GET) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP ${response.status}`);
      }

      return {
        data: responseData,
        status: response.status,
        success: true,
      };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: 500,
      };

      throw apiError;
    }
  }

  public async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HTTP_METHODS.GET, undefined, headers);
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HTTP_METHODS.POST, data, headers);
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HTTP_METHODS.PUT, data, headers);
  }

  public async patch<T>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HTTP_METHODS.PATCH, data, headers);
  }

  public async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HTTP_METHODS.DELETE, undefined, headers);
  }

  public setAuthToken(token: string): void {
    // Store token for future requests
    localStorage.setItem('auth_token', token);
  }

  public getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  public clearAuthToken(): void {
    localStorage.removeItem('auth_token');
  }
}

export const apiClient = new ApiClient();
export default apiClient; 