import * as api from "reverse-api";

/**
 * The reverse operation handler. All logic for the operation is in this function.
 * This operation will take the body of a request, a string and return the reversed
 * string in the body of the response.
 */
export const reverse: api.server.ReverseOperationHandler<{}> = async (entity) => {
  // get the text we want to reverse
  const originalText = entity as string;

  // reverse the text
  const characters = [...originalText];
  characters.reverse();
  const reversedText = characters.join("");

  // return the reversed text to the client
  return reversedText;
};
