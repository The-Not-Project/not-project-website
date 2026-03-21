import Loader from "@/app/(public)/shared/components/loader/loader";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string
  isPending: boolean
  disabled?: boolean
}

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

export function FormButton({name, isPending, disabled, ...props}: ButtonProps) {
  return (
    <button disabled={disabled ?? isPending}>
      {isPending ? <Loader /> : name}
    </button>
  )
}