import * as api from "reverse-api";

main();

function main() {
  window.addEventListener("submit", (event) => {
    event.preventDefault();

    task().catch((error) => alert(error));

    async function task() {
      window.document.body.className = "busy";
      try {
        const form = event.target as HTMLFormElement;
        const input = form.elements.item(0) as HTMLInputElement;

        const result = await api.reverse(
          {
            contentType: "text/plain",
            value: () => input.value,
          },
          {},
          { baseUrl: new URL("/", window.document.location.href) },
        );

        if (result.status !== 200) {
          throw new Error("unexpected status");
        }

        const resultValue = await result.value();

        alert(resultValue);
      } finally {
        window.document.body.className = "";
      }
    }
  });
}
