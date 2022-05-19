import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { STORAGE } from "~/constants/storage";
import { log } from "~/utils/console";
import { storage } from "~/utils/storage";
import { IAnyType, IUserType } from "~/types";

import { MUTATION_UPDATE_CURRENT_USER } from "./mutation";
import { QUERY_CURRENT_USER } from "./query";
import { URLS } from "./config";

export const INITIAL_STATE_USER = {
  currentUser: {
    id: undefined,
  },
};

/**
 * mutations for updating local state currentUser
 */
const localCache = new InMemoryCache();

class ApolloWrapper {
  cache: IAnyType;
  client: IAnyType;
  token: string | null;

  constructor() {
    this.cache = null;
    this.client = null;
    this.token = null;
    this.initialize = this.initialize.bind(this);
  }

  async setToken(token: string | null): Promise<void> {
    if (token) {
      await storage.set.item(STORAGE.TOKEN, token);
    } else {
      await storage.delete.item(STORAGE.TOKEN);
    }
    this.token = token;
  }

  async getToken(): Promise<void> {
    const token = await storage.get.item(STORAGE.TOKEN);
    this.token = token;
    return token;
  }

  initLocalCache = async (): Promise<void> => {
    const currentUser = await storage.get.item(STORAGE.CURRENT_USER);

    if (currentUser) {
      this.updateLocalStateCurrentUser(JSON.parse(currentUser));
    } else {
      this.updateLocalStateCurrentUser(INITIAL_STATE_USER.currentUser);
    }
  };

  logout = async () => {
    await storage.delete.multiple([STORAGE.CURRENT_USER, STORAGE.TOKEN]);
    this.updateLocalStateCurrentUser(INITIAL_STATE_USER.currentUser);
  };

  updateLocalStateCurrentUser = async (
    currentUser: Partial<IUserType>,
    updateStorage = true
  ): Promise<void> => {
    if (updateStorage) {
      await storage.set.item(STORAGE.CURRENT_USER, JSON.stringify(currentUser));
    }
    await this.client.mutate({
      mutation: MUTATION_UPDATE_CURRENT_USER,
      variables: { currentUser },
    });
  };

  resetLocalStateCurrentUser = async (): Promise<void> => {
    await storage.delete.allKeys(); // clear all storage
    if (this.client?.cache?.resetStore) {
      await this.client?.cache?.resetStore(); // clear cache in memory
    }
    this.client.cache.writeQuery({
      // update query in cache
      query: QUERY_CURRENT_USER,
      data: { currentUser: INITIAL_STATE_USER.currentUser },
    });
    storage.set.item(
      STORAGE.CURRENT_USER,
      JSON.stringify(INITIAL_STATE_USER.currentUser)
    ); // put initial config in storage
  };

  async initialize(): Promise<void> {
    await this.getToken();
    const that = this;

    const httpLink = new HttpLink({ uri: URLS.http });
    const authLink: IAnyType = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${that.token}`,
        },
      });
      return forward(operation);
    });

    this.cache = localCache;
    this.client = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors && Array.isArray(graphQLErrors)) {
            graphQLErrors.forEach(({ message, locations, path }) =>
              log(
                `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                  locations,
                  null,
                  2
                )}, Path: ${path}`
              )
            );
          }
          if (networkError) {
            log(
              `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
            );
          }
        }),
        // this uses apollo-link-http under the hood, so all the options here come from that package
        authLink.concat(httpLink),
      ]),
      credentials: "same-origin",
      cache: localCache,
      resolvers: {
        Mutation: {
          updateCurrentUser: async (
            _: IAnyType,
            { currentUser }: IAnyType,
            { cache }: IAnyType
          ): Promise<null> => {
            const data = cache.readQuery({ query: QUERY_CURRENT_USER });
            let newData = { ...(data?.currentUser || {}), ...currentUser };
            if (currentUser && !Object.keys(currentUser).length) {
              newData = {};
            }
            cache.writeQuery({
              query: QUERY_CURRENT_USER,
              data: { currentUser: newData },
            });
            await storage.set.item(
              STORAGE.CURRENT_USER,
              JSON.stringify(newData)
            );
            return null; //best practices
          },
        },
      },
    });
    this.initLocalCache();
  }
}

const client = new ApolloWrapper();
export default client;
