import { APP_ENV } from '~/env';

const ENVIRONMENT_URLS: { [key: string]: { base: string; http: string } } = {
  local: {
    base: 'http://localhost:8000',
    http: 'http://localhost:8000/graphql',
  },

  staging: {
    base: 'https://api-staging.eudoctor.org',
    http: 'https://api-staging.eudoctor.org/graphql',
  },
  production: {
    base: 'https://api.eudoctor.org',
    http: 'https://api.eudoctor.org/graphql',
  },
};

const ENVIRONMENT = APP_ENV || 'local';

export const URLS = ENVIRONMENT_URLS[ENVIRONMENT];
