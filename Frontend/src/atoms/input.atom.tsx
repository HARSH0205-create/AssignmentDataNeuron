function InputBox(props: any) {
  let {
    name,
    label = "",
    type = "text",
    placeholder = "",
    onChange,
    onBlur,
    value,
    message = "",
  } = props;
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        className="form-control"
        placeholder={placeholder}
      />
      {message && <div id="feedback">{message}</div>}
    </div>
  );
}

export default InputBox;
