export default function InputError({ message, className = "" }) {
    return message ? <p className={className}>{message}</p> : null;
}