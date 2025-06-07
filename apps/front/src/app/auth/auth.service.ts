import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthDto } from './auth.dto';
import { Observable } from 'rxjs';
import { UserProfile } from '@lifestyle-dashboard/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  public login(dto: AuthDto): Observable<void> {
    return this.httpClient.post<void>('/api/auth/login', dto, {
      withCredentials: true,
    });
  }

  public register(dto: AuthDto): Observable<void> {
    return this.httpClient.post<void>('/api/auth/register', dto, {
      withCredentials: true,
    });
  }

  public logout(): Observable<void> {
    return this.httpClient.post<void>('/api/auth/logout', null, {
      withCredentials: true,
    });
  }

  public getMe(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>('/api/auth/me', {
      withCredentials: true,
    });
  }
}
