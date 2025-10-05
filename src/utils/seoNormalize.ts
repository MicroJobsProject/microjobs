export function seoNormalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/á|é|í|ó|ú/g, (match) => {
      const accents: { [key: string]: string } = {
        á: "a",
        é: "e",
        í: "i",
        ó: "o",
        ú: "u",
      };
      return accents[match];
    })
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
