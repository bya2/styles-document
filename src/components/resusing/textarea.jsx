const Comp_textarea__reusing = ({
  className,
  name,
  rows,
  placeholder,
  defaultValue,
  value,
  onChange,
  onMouseDown,
  onClick,
  onKeyDown,
}) => {
  return (
    <textarea
      className={className}
      name={name}
      rows={rows}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onKeyDown={onKeyDown}
    />
  );
};

export default Comp_textarea__reusing;
