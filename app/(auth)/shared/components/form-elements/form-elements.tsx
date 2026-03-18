type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export function FormInput({ name, ...props }: InputProps) {
  return (
    <input
      id={name}
      name={name}
      {...props}
      required
    />
  );
}