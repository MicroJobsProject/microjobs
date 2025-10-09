import { useState } from "react";

function PriceInput({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  const [displayValue, setDisplayValue] = useState<string>(
    value ? formatEuro(value) : "",
  );

  function formatEuro(amount: number) {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    const numericValue = parseFloat(
      input.replace(/[^\d,.-]/g, "").replace(",", "."),
    );

    if (!isNaN(numericValue)) {
      setDisplayValue(formatEuro(numericValue));
      onChange(numericValue);
    } else {
      setDisplayValue(input);
    }
  }

  function handleBlur() {
    if (displayValue) {
      const numericValue = parseFloat(
        displayValue.replace(/[^\d,.-]/g, "").replace(",", "."),
      );
      if (!isNaN(numericValue)) {
        setDisplayValue(formatEuro(numericValue));
      }
    }
  }

  return (
    <input
      type="text"
      name="price"
      placeholder="0,00 €"
      className="input"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      required
    />
  );
}

export default PriceInput;
