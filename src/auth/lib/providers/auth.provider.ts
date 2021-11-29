import { APP_INITIALIZER } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

export interface KcAuthOptions {
    url: string;
    realm: string;
    clientId: string;
}

function initializeKeycloak(options: KcAuthOptions) {
    return (keycloak: KeycloakService) => () =>
        keycloak.init({
            config: {
                url: options.url,
                realm: options.realm,
                clientId: options.clientId,
            },
            initOptions: {
                onLoad: 'login-required',
            },
            bearerExcludedUrls: ['/assets'],
            loadUserProfileAtStartUp: true,
        });
}

export function authProviderBuilder(options: KcAuthOptions) {
    return {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak(options),
        multi: true,
        deps: [KeycloakService],
    };
}