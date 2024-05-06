import * as api from "reverse-api";

main();

// entrypoint for the client
function main() {
  // Add event listener for sub events
  window.addEventListener("submit", (event) => {
    // prevent the submit from navigating
    event.preventDefault();

    // wrap async task
    task().catch((error) => alert(error));

    async function task() {
      // set a busy class to indicate that we are doing something
      window.document.body.className = "busy";
      try {
        const form = event.target as HTMLFormElement;
        // assume our form has one element that is an input
        const input = form.elements.item(0) as HTMLInputElement;

        // call the api
        const result = await api.reverse(
          {
            contentType: "text/plain",
            value: () => input.value,
          },
          {},
          { baseUrl: new URL("/", window.document.location.href) },
        );

        // verify response status
        if (result.status !== 200) {
          throw new Error("unexpected status");
        }

        // get the result
        const resultValue = await result.value();

        // alert the result, a reversed string!
        alert(resultValue);
      } finally {
        // unset busy class, we are done
        window.document.body.className = "";
      }
    }
  });
}
