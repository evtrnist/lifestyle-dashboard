import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthDto } from './auth.dto';
import { Observable } from 'rxjs';
import { UserProfile } from '@lifestyle-dashboard/user';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly httpClient = inject(HttpClient);

  public login(dto: AuthDto): Observable<void> {
    const body = new URLSearchParams();
    body.set('email', dto.email);
    body.set('password', dto.password);

    return this.httpClient.post<void>('/api/auth/login', body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });
  }

  public register(dto: AuthDto): Observable<void> {
    const body = new URLSearchParams();
    body.set('email', dto.email);
    body.set('password', dto.password);

    return this.httpClient.post<void>('/api/auth/register', body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
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
