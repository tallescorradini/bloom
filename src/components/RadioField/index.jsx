import styles from "./RadioField.module.scss";

export function RadioField({
  label,
  id,
  name,
  value,
  onChange,
  selectedValue,
  className,
}) {
  const stringfiedValue = value.toString();
  const stringfiedSelectedValue = selectedValue.toString();
  return (
    <div className={`${styles.radioField} ${className}`}>
      <input
        onChange={onChange}
        checked={stringfiedValue === stringfiedSelectedValue}
        type="radio"
        name={name}
        id={id}
        value={stringfiedValue}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
