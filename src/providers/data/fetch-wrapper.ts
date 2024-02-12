import { GraphQLFormattedError } from 'graphql';

// docs: custom type for error handling variable
type Error = {
  message: string;
  statusCode: string;
};

// docs: custom fetch build for repetitive fetching tasks with built in custom Authorization/Authentication & Error Handling
const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem('access_token');
  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Apollo-Require-Preflight': 'true',
    },
  });
};

// docs: Custom GraphQL Error Handling
const getGraphQLErrors = (
  body: Record<'errors', GraphQLFormattedError[] | undefined>
): Error | null => {
  if (!body) {
    return {
      message: 'Unknown Error',
      statusCode: 'INTERNAL_SERVER_ERROR',
    };
  }

  if ('errors' in body) {
    const errors = body?.errors;

    const messages = errors?.map((error) => error?.message)?.join('');
    const code = errors?.[0]?.extensions?.code;

    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500,
    };
  }

  return null;
};

// docs: custom fetchWrapper func. (like middleware), already include custom fetching & error handling
export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);
  const responseClone = response.clone();

  const body = await responseClone.json();
  const error = getGraphQLErrors(body);

  if (error) {
    throw error;
  }

  return response;
};
